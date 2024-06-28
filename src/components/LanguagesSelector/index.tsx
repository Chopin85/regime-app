import { useRouter, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { BsGlobe2 } from 'react-icons/bs';
import { SelectIcon } from '@radix-ui/react-select';
import { locales } from '@/i18n/i18n';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

export const LanguageSelector = () => {
  const router = useRouter();
  const currentLocale = useLocale();
  const currentPathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectLanguage = (newLocale: string) => {
    startTransition(() => {
      if (currentLocale === 'fr') {
        router.push(`/${newLocale}/${currentPathname}`, {
          scroll: false,
        });
        return;
      }
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
        {
          scroll: false,
        },
      );
    });
  };

  return (
    <Select
      onValueChange={onSelectLanguage}
      defaultValue={currentLocale}
      disabled={isPending}
    >
      <SelectTrigger className="gap-1">
        <SelectIcon>
          <BsGlobe2 />
        </SelectIcon>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {locale.toLocaleUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
