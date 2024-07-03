import { Button } from '@/components/ui/button';

export function ActionButtons({
  isEditMode,
  isValid = true,
  isLoading = false,
  isLastStep = false,
  onCancelOrBack,
  onSaveOrNext
}: {
  isEditMode: boolean;
  isValid?: boolean;
  isLoading?: boolean;
  isLastStep?: boolean;
  onCancelOrBack?: () => void;
  onSaveOrNext?: () => void;
}) {
  return (
    <div className="flex gap-4 self-end [&>button]:w-[165px]">
      <Button type="button" variant="outline" onClick={onCancelOrBack}>
        {isEditMode ? 'Cancel' : 'Back'}
      </Button>
      {(!isLastStep || isEditMode) && (
        <Button type="submit" disabled={!isValid} isLoading={isLoading} onClick={onSaveOrNext}>
          {isEditMode ? 'Save' : 'Next'}
        </Button>
      )}
    </div>
  );
}
