import {createRoute, createRootRoute} from '@tanstack/react-router';
import {RootLayout} from '../layouts/RootLayout';
import {ContactsPage} from '../pages/ContactsPage';
import {ContactDetailsPage} from '../pages/ContactDetailsPage';
import {NewContactPage} from '../pages/NewContactPage';

export const rootRoute = createRootRoute({
    component: RootLayout,
});

export const contactsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: ContactsPage,
});

export const contactDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contacts/$contactId',
    component: ContactDetailsPage,
});

export const newContactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contacts/new',
    component: NewContactPage,
});

export const routeTree = rootRoute.addChildren([
    contactsRoute,
    contactDetailsRoute,
    newContactRoute,
]);