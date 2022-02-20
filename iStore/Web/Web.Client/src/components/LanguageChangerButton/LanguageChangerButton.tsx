import 'reflect-metadata';

import React, { useState } from 'react';

import { observer } from 'mobx-react';

import Button from '@mui/material/Button';

import i18n from '../../locales/config';

const LanguageChangerButton = observer(() => {
  const [language, setLanguage] = useState<'en' | 'ru'>('ru');

  const handleChange = async (): Promise<void> => {
    const lang: 'en' | 'ru' = language === 'en' ? 'ru' : 'en';
    setLanguage(lang);
    await i18n.changeLanguage(language);
  };

  return (
    <Button
      className="langSwitcher"
      variant="contained"
      color="info"
      value={language}
      onClick={(): Promise<void> => handleChange()}
    >
      {language.toUpperCase()}
    </Button>
  );
});

export default LanguageChangerButton;
