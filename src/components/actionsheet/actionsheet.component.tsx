import React from 'react';
import {
  Actionsheet as GActionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '../ui/actionsheet';

interface CustomActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Actionsheet = ({ isOpen, onClose, children }: CustomActionSheetProps) => {
  return (
    <GActionsheet useRNModal isOpen={isOpen} onClose={onClose} snapPoints={[70]} closeOnOverlayClick>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator className="bg-[#8E8E8E] w-12 h-1.5 rounded-full" />
        </ActionsheetDragIndicatorWrapper>
        {children}
      </ActionsheetContent>
    </GActionsheet>
  );
};
