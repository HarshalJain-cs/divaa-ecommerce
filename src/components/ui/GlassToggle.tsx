/**
 * @component GlassToggle
 * @description Beautiful glass morphism toggle for Gold/Silver navigation
 * Default: Silver selected
 */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './GlassToggle.css';

interface GlassToggleProps {
  defaultSelection?: 'silver' | 'gold';
  onSelectionChange?: (selection: 'silver' | 'gold') => void;
  mode?: 'navigation' | 'filter'; // navigation: redirects, filter: just changes state
}

export default function GlassToggle({
  defaultSelection = 'silver',
  onSelectionChange,
  mode = 'navigation'
}: GlassToggleProps) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<'silver' | 'gold'>(defaultSelection);

  useEffect(() => {
    setSelected(defaultSelection);
  }, [defaultSelection]);

  const handleSelection = (selection: 'silver' | 'gold') => {
    setSelected(selection);

    // Call callback if provided
    if (onSelectionChange) {
      onSelectionChange(selection);
    }

    // Navigate if in navigation mode
    if (mode === 'navigation') {
      navigate(`/collections/${selection}`);
    }
  };

  return (
    <div className="glass-toggle-wrapper">
      <div className="glass-radio-group">
        <input
          type="radio"
          name="metal-plan"
          id="glass-silver"
          checked={selected === 'silver'}
          onChange={() => handleSelection('silver')}
        />
        <label htmlFor="glass-silver" onClick={() => handleSelection('silver')}>
          Silver
        </label>

        <input
          type="radio"
          name="metal-plan"
          id="glass-gold"
          checked={selected === 'gold'}
          onChange={() => handleSelection('gold')}
        />
        <label htmlFor="glass-gold" onClick={() => handleSelection('gold')}>
          Gold
        </label>

        <div
          className={`glass-glider ${
            selected === 'gold' ? 'glass-glider-gold' : 'glass-glider-silver'
          }`}
        />
      </div>
    </div>
  );
}
