'use client';
import { forwardRef } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const Input = forwardRef(
  ({ label, type = 'text', name, value, onChange, placeholder, required, icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
          )}
          <input
            ref={ref}
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} rounded-lg border dark:border-slate-600 
              bg-white dark:bg-slate-700 focus:ring-2 focus:ring-[var(--primary)] 
              focus:border-transparent transition-all disabled:opacity-50
              ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
            <FaExclamationCircle />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;