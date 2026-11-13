import React, { useState, useEffect, useRef } from 'react';
import { Edit3, Check, X } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { getTextBlock, onTextBlocksChange } from '../../utils/customContentStorage';

interface EditableTextProps {
  contentKey: string;
  defaultValue: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
  contentKey,
  defaultValue,
  as: Tag = 'span',
  className = '',
  multiline = false,
  placeholder = 'Kliknite za unos teksta...',
  children
}) => {
  const { isEditMode, setPendingChange, pendingChanges } = useAdminAuth();
  const [storedValue, setStoredValue] = useState<string>(() => getTextBlock(contentKey, defaultValue));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draftValue, setDraftValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Sync stored value when external changes, storage events, or language defaultValue changes occur
  useEffect(() => {
    setStoredValue(getTextBlock(contentKey, defaultValue));
    const unsub = onTextBlocksChange(() => {
      setStoredValue(getTextBlock(contentKey, defaultValue));
    });
    return unsub;
  }, [contentKey, defaultValue]);

  // If there's a staged pending change, display it
  const currentValue = pendingChanges[contentKey] !== undefined 
    ? pendingChanges[contentKey] 
    : storedValue;

  const isStaged = pendingChanges[contentKey] !== undefined && pendingChanges[contentKey] !== storedValue;

  const startEditing = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.stopPropagation();
    e.preventDefault();
    setDraftValue(currentValue);
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        if ('select' in inputRef.current) {
          inputRef.current.select();
        }
      }
    }, 40);
  };

  const commitEdit = () => {
    const trimmed = draftValue.trim();
    if (trimmed !== currentValue) {
      setPendingChange(contentKey, trimmed || defaultValue);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraftValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancelEdit();
    } else if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      commitEdit();
    }
  };

  // 1. PUBLIC VIEW (When not in admin edit mode)
  if (!isEditMode) {
    return <Tag className={className}>{currentValue || children || defaultValue}</Tag>;
  }

  // 2. ACTIVE INLINE EDITING STATE
  if (isEditing) {
    return (
      <span className="relative inline-block w-full my-1 z-30 font-sans">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draftValue}
            onChange={(e) => setDraftValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitEdit}
            placeholder={placeholder}
            rows={3}
            className="w-full bg-[#0F2038] text-white border-2 border-[#00C9A7] rounded-xl p-2.5 text-xs sm:text-sm outline-none shadow-2xl focus:ring-2 focus:ring-[#00C9A7]/40 resize-y"
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draftValue}
            onChange={(e) => setDraftValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitEdit}
            placeholder={placeholder}
            className="w-full bg-[#0F2038] text-white border-2 border-[#00C9A7] rounded-xl px-3 py-1.5 text-xs sm:text-sm outline-none shadow-2xl focus:ring-2 focus:ring-[#00C9A7]/40"
          />
        )}
        <span className="absolute right-2 -bottom-6 flex items-center gap-1.5 bg-[#0A1628] border border-[#00C9A7]/50 rounded-md px-2 py-0.5 text-[10px] font-mono text-[#00C9A7] shadow-lg pointer-events-none z-40">
          <span>Enter za potvrdu • Esc za prekid</span>
        </span>
      </span>
    );
  }

  // 3. EDIT MODE HOVER / READY STATE
  return (
    <Tag
      onClick={startEditing}
      title="Kliknite za uređivanje teksta (WYSIWYG Inline CMS)"
      className={`group relative cursor-pointer transition-all duration-200 outline-dashed outline-1 outline-[#00C9A7]/50 hover:outline-2 hover:outline-[#00C9A7] hover:bg-[#00C9A7]/10 rounded-lg px-1 py-0.5 ${
        isStaged ? 'bg-[#00C9A7]/15 outline-[#00C9A7] ring-1 ring-[#00C9A7]/40' : ''
      } ${className}`}
    >
      {currentValue || children || defaultValue}
      
      {/* Floating Pencil Badge on Hover */}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3.5 -right-2 px-1.5 py-0.5 rounded bg-[#00C9A7] text-[#0A1628] text-[9px] font-mono font-bold flex items-center gap-1 shadow-lg pointer-events-none z-20">
        <Edit3 className="w-2.5 h-2.5" />
        <span>Uredi</span>
      </span>

      {/* Staged Indicator */}
      {isStaged && (
        <span className="absolute -bottom-3 right-0 px-1.5 py-0.2 rounded bg-[#C9A84C] text-[#0A1628] text-[8px] font-mono font-extrabold uppercase pointer-events-none shadow">
          Nespremljeno
        </span>
      )}
    </Tag>
  );
};
