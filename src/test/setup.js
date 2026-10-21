import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
HTMLDialogElement.prototype.showModal = function () { this.open = true; };
HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new Event('close')); };
