import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type Region = 'US' | 'IN';

export function useRegion() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine region from path or localStorage
  const getInitialRegion = (): Region => {
    if (location.pathname.startsWith('/in')) {
      return 'IN';
    }
    if (location.pathname.startsWith('/us')) {
      return 'US';
    }
    const saved = localStorage.getItem('aiml_user_region') as Region;
    if (saved === 'IN' || saved === 'US') {
      return saved;
    }
    // Default to US for global/US market priority
    return 'US';
  };

  const [region, setRegionState] = useState<Region>(getInitialRegion);

  useEffect(() => {
    if (location.pathname.startsWith('/in')) {
      setRegionState('IN');
      localStorage.setItem('aiml_user_region', 'IN');
    } else if (location.pathname.startsWith('/us')) {
      setRegionState('US');
      localStorage.setItem('aiml_user_region', 'US');
    }
  }, [location.pathname]);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    localStorage.setItem('aiml_user_region', newRegion);
    if (newRegion === 'IN') {
      navigate('/in');
    } else {
      navigate('/');
    }
  };

  return { region, setRegion };
}
