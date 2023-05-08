import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { s4render } from '../TestUtils';
import PrivacyPolicy from '../../Core/PrivacyPolicy';
import TermsOfUse from '../../Core/TermsOfUse';

describe('Static Pages', () => {
  describe('Privacy Policy Page', () => {
    it('Renders the privacy policy page', () => {
      s4render(<PrivacyPolicy />);
      const paragraph = screen.getByText(
        /This Privacy Policy explains how we collect, use, and disclose your personal information when you use our application./
      );
      expect(paragraph).toBeInTheDocument();
    });
    it('Renders the privacy policy page with all the sections', () => {
      s4render(<PrivacyPolicy />);

      expect(screen.getByText(/Information We Collect/)).toBeInTheDocument();
      expect(
        screen.getByText(/How We Use Your Information/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/How We Share Your Information/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Your Choices/)).toBeInTheDocument();
      expect(
        screen.getByText(/Changes to this Privacy Policy/)
      ).toBeInTheDocument();
    });
  });

  describe('Terms of Use Page', () => {
    it('Renders the terms of use page', () => {
      s4render(<TermsOfUse />);
      const paragraph = screen.getByText(
        /you agree to these Terms of Use, which constitute a binding agreement between you and SYS4. If you do not agree to these Terms of Use, do not use/i
      );
      expect(paragraph).toBeInTheDocument();
    });

    it('Renders the terms of use page with all the sections', () => {
      s4render(<TermsOfUse />);

      expect(screen.getByText(/Use of Application/)).toBeInTheDocument();
      // expect(screen.getByText(/User Account/)).toBeInTheDocument();
      expect(screen.getByText(/Intellectual Property/)).toBeInTheDocument();
      expect(screen.getByText(/Disclaimer of Warranties/)).toBeInTheDocument();
      expect(screen.getByText(/Limitation of Liability/)).toBeInTheDocument();
      expect(
        screen.getByText(/Modification of Terms of Use/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Governing Law/)).toBeInTheDocument();
    });
  });
});
