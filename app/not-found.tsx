'use client';
import React from 'react';
import { ErrorPage } from '@/components/error/error-varaiants';

const NotFound = () => {
  return (
    <div>
      <ErrorPage type="not-found" />
    </div>
  );
};

export default NotFound;
