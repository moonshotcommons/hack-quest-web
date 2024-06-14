import Button from '@/components/Common/Button';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { cn } from '@/helper/utils';

export function ActionButtons({
  isValid,
  onBack,
  isLast = false,
  className
}: {
  isValid: boolean;
  onBack: () => void;
  isLast?: boolean;
  className?: string;
}) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.IDEA_BANK);

  return (
    <div
      className={cn(
        '[&>button]:button-text-m flex gap-4 self-end [&>button]:h-12 [&>button]:w-[165px] [&>button]:py-4 [&>button]:uppercase',
        className
      )}
    >
      <Button htmlType="button" ghost onClick={onBack}>
        {t('modal.back')}
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        className={cn({
          'bg-neutral-light-gray': !isValid
        })}
        disabled={!isValid}
      >
        {isLast ? t('modal.submit') : t('modal.next')}
      </Button>
    </div>
  );
}
