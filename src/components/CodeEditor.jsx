import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';

export default function CodeEditor({ value, onChange, language = 'python', height = '60vh' }) {
  const langExt = useMemo(() => ({
    python: python(),
    cpp: cpp(),
    java: java(),
  }[language] || python()), [language]);

  return (
    <CodeMirror
      value={value}
      height={height}
      theme={oneDark}
      extensions={[langExt]}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        history: true,
        foldGutter: true,
      }}
      onChange={(v) => onChange?.(v)}
      style={{ borderRadius: 12, overflow: 'hidden' }}
    />
  );
}


