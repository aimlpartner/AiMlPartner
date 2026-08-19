import { getGoogleGenAI, parseGeminiJson } from '../lib/gemini.js';
import { scrapeUrlText, isDomainOrUrl } from '../lib/scraper.js';
import { createFallbackResult, buildAnalysisPrompt } from '../data/fallbackResult.js';

/**
 * POST /api/analyze
 *
 * Accepts a URL, company name, file content, or description.
 * Deep-crawls the website, sends to Gemini 2.5 Flash with Google Search grounding,
 * validates the response, and returns a structured analysis result.
 */
export async function analyzeHandler(req, res) {
  const { url, description, fileContent } = req.body;

  const ai = getGoogleGenAI();
  if (!ai) {
    console.error('[Analyze] Gemini API Client is not configured (missing GEMINI_API_KEY).');
    return res.status(503).json({ error: 'AI analysis engine is not configured on the server. Please check your environment variables.' });
  }

  let finalContext = '';
  let sourceChannel = '';

  try {
    if (url) {
      const isUrl = isDomainOrUrl(url);
      if (isUrl) {
        console.log(`[Analyze] Scraping website: ${url}`);
        try {
          const scraped = await scrapeUrlText(url);
          finalContext = `Website scrape of domain (${url}):\n\n${scraped}`;
          sourceChannel = `website URL (${url})`;
        } catch (scrapeErr) {
          console.warn(`[Analyze] Scraping failed for ${url}, continuing with search grounding.`, scrapeErr.message || scrapeErr);
          finalContext = `Website URL: ${url} (Scraping failed, please search the web for details about this company/domain)`;
          sourceChannel = `website URL (${url}) with search fallback`;
        }
      } else {
        console.log(`[Analyze] Treating input as company name: ${url}`);
        finalContext = `Company Name: ${url} (Please search the web for details about this company)`;
        sourceChannel = `company name (${url})`;
      }
    } else if (fileContent) {
      finalContext = `Uploaded brief contents:\n\n${fileContent}`;
      sourceChannel = 'uploaded document';
    } else if (description) {
      finalContext = `Description:\n\n${description}`;
      sourceChannel = 'direct description text';
    } else {
      return res.status(400).json({ error: 'Missing context' });
    }

    const prompt = buildAnalysisPrompt(sourceChannel, finalContext);

    let aiResponse;
    try {
      aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
        }
      });
    } catch (err) {
      console.warn('[Analyze] Grounding failed, falling back to normal:', err.message);
      aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });
    }

    const rawText = aiResponse.text;
    if (!rawText) throw new Error('Empty text');

    const parsedData = parseGeminiJson(rawText);

    // Calculate token usage and cost for Gemini 2.5 Flash
    const promptTokens = aiResponse.usageMetadata?.promptTokenCount || 0;
    const completionTokens = (aiResponse.usageMetadata?.candidatesTokenCount || 0) + (aiResponse.usageMetadata?.thoughtsTokenCount || 0);
    const totalTokens = aiResponse.usageMetadata?.totalTokenCount || (promptTokens + completionTokens);

    const hasGrounding = !!aiResponse.candidates?.[0]?.groundingMetadata?.webSearchQueries?.length;
    const groundingQueries = hasGrounding ? 1 : 0;

    // Pricing: Input $0.30/1M, Output $2.50/1M, Search Grounding $0.035/query
    const costUsd = (promptTokens * 0.00000030) +
      (completionTokens * 0.00000250) +
      (hasGrounding ? 0.035 : 0);

    console.log(`[Analyze] Cost: $${costUsd.toFixed(6)} (In: ${promptTokens}, Out: ${completionTokens}, Grounding: ${hasGrounding ? 'Yes' : 'No'})`);

    const fallback = createFallbackResult();

    const validatedData = {
      tokenUsage: {
        promptTokens,
        completionTokens,
        totalTokens,
        groundingQueries,
        costUsd
      },
      businessName: parsedData.businessName || 'Your Business',
      sector: parsedData.sector || 'Services',
      executiveDiagnosis: parsedData.executiveDiagnosis || 'Diagnostic audit indicates multiple opportunities to streamline non-core operations through secure, low-impact integrations.',
      readinessScore: Number.isInteger(parsedData.readinessScore) ? parsedData.readinessScore : 50,
      readinessTier: ['Novice', 'Exploring', 'Operational', 'Advanced'].includes(parsedData.readinessTier) ? parsedData.readinessTier : 'Exploring',
      annualReclaimedROI: Number.isInteger(parsedData.annualReclaimedROI) ? parsedData.annualReclaimedROI : 75000,
      internalDragHours: Number.isInteger(parsedData.internalDragHours) ? parsedData.internalDragHours : 40,
      reclaimedTimeHours: Number.isInteger(parsedData.reclaimedTimeHours) ? parsedData.reclaimedTimeHours : 30,
      departments: Array.isArray(parsedData.departments) ? parsedData.departments.map(dept => ({
        name: dept.name || 'Operations',
        icon: dept.icon || 'FileText',
        weeklyTimeLeak: Number.isInteger(dept.weeklyTimeLeak) ? dept.weeklyTimeLeak : 10,
        friction: dept.friction || 'Manual tasks slowing processing times.',
        resolution: dept.resolution || 'Automate pipeline data flow.',
        playbook: {
          workflow: dept.playbook?.workflow || 'Standard trigger to action flow.',
          integrationPath: dept.playbook?.integrationPath || 'API connection mapping.',
          toolStack: Array.isArray(dept.playbook?.toolStack) ? dept.playbook.toolStack : ['Make.com', 'OpenAI'],
          complexity: ['Low', 'Medium', 'High'].includes(dept.playbook?.complexity) ? dept.playbook.complexity : 'Low',
          timeline: dept.playbook?.timeline || '2 weeks',
          successMetrics: dept.playbook?.successMetrics || 'Boost processing time.',
          roi: Number.isInteger(dept.playbook?.roi) ? dept.playbook.roi : 25000,
          aimlPartnerServiceSuggestion: dept.playbook?.aimlPartnerServiceSuggestion || 'AIMLpartner can configure and deploy this complete pipeline in 14 days under a fixed-price Low-Code Pod.'
        }
      })) : fallback.departments,
      roadmap: {
        dataReadinessAssessment: parsedData.roadmap?.dataReadinessAssessment || 'Viable data format alignment available.',
        phases: Array.isArray(parsedData.roadmap?.phases) ? parsedData.roadmap.phases.map(phase => ({
          phaseNumber: Number.isInteger(phase.phaseNumber) ? phase.phaseNumber : 1,
          title: phase.title || 'Foundation Rollout',
          duration: phase.duration || '2 weeks',
          focus: phase.focus || 'System architecture config',
          milestones: Array.isArray(phase.milestones) ? phase.milestones : ['System setup']
        })) : fallback.roadmap.phases,
      },
      criticalRevenueLeak: {
        gapAnalysis: parsedData.criticalRevenueLeak?.gapAnalysis || 'Operational drag from manual handoffs.',
        lostCapitalScale: parsedData.criticalRevenueLeak?.lostCapitalScale || '$50,000 annually',
        agenticSolution: parsedData.criticalRevenueLeak?.agenticSolution || 'Deploy CRM-synced automated webhook monitors.'
      },
      _source: 'gemini'
    };

    res.status(200).json(validatedData);
  } catch (err) {
    console.error('[Analyze] Exception:', err);
    res.status(502).json({ error: `AI analysis failed: ${err.message || 'Unknown Gemini error'}` });
  }
}
