import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { s4render } from '../TestUtils';
import { CookieConsent } from '../../Core/legalPages/CookieConsent';

describe('CookieConsent', () => {
  it('renders correctly with the paragraph', () => {
    s4render(<CookieConsent />);
    expect(
      screen.getByText(
        /This site uses services that use cookies to deliver better experience and analyze traffic./
      )
    ).toBeInTheDocument();
  });

  it('sets a cookie when accepted', () => {
    s4render(<CookieConsent />);
    expect(screen.getByText('Got it')).toBeInTheDocument();
    screen.getByText('Got it').click();
    expect(document.cookie).toMatch(/_sys4_cookies_accepted=accepted/);
  });
});
