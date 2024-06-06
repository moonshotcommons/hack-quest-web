import Button from '@/components/Common/Button';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { cn } from '@/helper/utils';

export function ActionButtons({
  isValid,
  onBack,
  isLast = false
}: {
  isValid: boolean;
  onBack: () => void;
  isLast?: boolean;
}) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.IDEA_BANK);

  return (
    <div className="[&>button]:button-text-m mt-auto flex flex-col gap-4 sm:mt-0 sm:flex-row sm:justify-end [&>button]:h-12 [&>button]:w-full [&>button]:py-4 [&>button]:uppercase [&>button]:sm:w-[10.25rem]">
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
