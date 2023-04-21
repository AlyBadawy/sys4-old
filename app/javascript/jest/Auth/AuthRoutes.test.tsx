import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import {
  OfflineRouterConfig,
  OnlineRouterConfig,
} from '../../Core/RoutesConfig';
import { simpleRenderWithRedux } from '../TestUtils';

describe('AuthRoutes', () => {
  describe('When the App online flipper is on', () => {
    describe('When the user is not logged in', () => {
      it('Visiting the login page is okay', () => {
        const router = createMemoryRouter(OnlineRouterConfig, {
          initialEntries: ['/sign_in'],
        });

        simpleRenderWithRedux(
          <RouterProvider router={router} />,
          {},
          { auth: { isLoggedIn: false } }
        );

        expect(
          screen.getByText(/Sign in to your account/i)
        ).toBeInTheDocument();
      });
      it('Visiting the app page routes to the login page', () => {
        const router = createMemoryRouter(OnlineRouterConfig, {
          initialEntries: ['/app'],
        });

        simpleRenderWithRedux(
          <RouterProvider router={router} />,
          {},
          { auth: { isLoggedIn: false } }
        );

        expect(
          screen.getByText(/Sign in to your account/i)
        ).toBeInTheDocument();
        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
      });
    });
    describe('When the user is logged in', () => {
      it('Visiting the login page is not okay', () => {
        const router = createMemoryRouter(OnlineRouterConfig, {
          initialEntries: ['/sign_in'],
        });

        simpleRenderWithRedux(
          <RouterProvider router={router} />,
          {},
          { auth: { isLoggedIn: true } }
        );

        expect(
          screen.queryByText(/Sign in to your account/i)
        ).not.toBeInTheDocument();
      });
      it('Visiting the login page routes to the app page', () => {
        const router = createMemoryRouter(OnlineRouterConfig, {
          initialEntries: ['/sign_in'],
        });

        simpleRenderWithRedux(
          <RouterProvider router={router} />,
          {},
          { auth: { isLoggedIn: true } }
        );

        expect(
          screen.queryByText(/Sign in to your account/i)
        ).not.toBeInTheDocument();
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
      });
    });
  });

  describe('When the App online flipper is off', () => {
    it('Renders app offline page', () => {
      const router = createMemoryRouter(OfflineRouterConfig, {
        initialEntries: ['/app'],
      });
      simpleRenderWithRedux(<RouterProvider router={router} />);
      expect(
        screen.getByText(
          /is currently offline for maintenance. Our team is working hard to bring the application back online as soon as possible, with all features fully operational/i
        )
      ).toBeInTheDocument();
    });
  });
});
