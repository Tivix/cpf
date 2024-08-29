'use client';
import React, { FC, memo } from 'react';
import { generateClassNames } from '@app/utils';
import './styles.css';
import { EditorProps, holder } from './Editor.interface';
import { useEditor } from './Editor.hooks';
import { Controller, useFormContext } from 'react-hook-form';

const Editor: FC<EditorProps> = ({ data, name, label, className }) => {
  const { control } = useFormContext();
  useEditor(data, name);

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <>
          {label && <label className="text-navy-900">{label}</label>}
          <div
            className={generateClassNames(
              'mt-3 overflow-scroll rounded-xl border border-navy-200 pl-16 pt-4 shadow-sm',
              className,
            )}
            id={holder}
          />
        </>
      )}
    />
  );
};

export default memo(Editor);
