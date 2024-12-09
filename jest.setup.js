import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import * as React from 'react';

// Configure Testing Library to use React.act
configure({ asyncUtilTimeout: 4500, eventWrapper: React.act });
