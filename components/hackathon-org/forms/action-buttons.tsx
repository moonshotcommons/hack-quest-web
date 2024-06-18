import { Button } from '@/components/ui/button';

export function ActionButtons({
  isEditMode,
  isValid = true,
  idLoading = false,
  isLastStep = false,
  onCancelOrBack
}: {
  isEditMode: boolean;
  isValid?: boolean;
  idLoading?: boolean;
  isLastStep?: boolean;
  onCancelOrBack?: () => void;
}) {
  return (
    <div className="flex gap-4 self-end [&>button]:w-[165px]">
      <Button type="button" variant="outline" onClick={onCancelOrBack}>
        {isEditMode ? 'Cancel' : 'Back'}
      </Button>
      <Button type="submit" disabled={!isValid} isLoading={idLoading}>
        {isEditMode ? 'Save' : isLastStep ? 'Submit' : 'Next'}
      </Button>
    </div>
  );
}
