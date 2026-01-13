export type SupportedLocale = 'en' | 'es' | 'de' | 'fr' | 'ru' | 'it' | 'ja' | 'zh-CN' | 'zh-TW';

type EmailTexts = {
  welcome: {
    subject: string;
    greeting: string;
    greetingName: string;
    body: string;
    items: string[];
    cta: string;
    footer: string;
  };
  passwordReset: {
    subject: string;
    title: string;
    body: string;
    expires: string;
    cta: string;
    ignore: string;
    copyLink: string;
  };
  passwordChanged: {
    subject: string;
    title: string;
    body: string;
    ifYou: string;
    ifNot: string;
    cta: string;
  };
  purchase: {
    subject: string;
    title: string;
    body: string;
    licenseKey: string;
    validUntil: string;
    includes: string;
    items: string[];
    cta: string;
    keepEmail: string;
  };
  common: { copyright: string };
};

const texts: Record<SupportedLocale, EmailTexts> = {
  en: {
    welcome: {
      subject: 'Welcome to React Google Maps API! 🗺️',
      greeting: 'Welcome! 🎉',
      greetingName: 'Hi {name}! 🎉',
      body: 'Thank you for creating an account with React Google Maps API. You now have access to the most popular React library for Google Maps.',
      items: [
        'Explore our comprehensive documentation',
        'Check out code examples and components',
        'Get a commercial license for your projects',
      ],
      cta: 'View Documentation →',
      footer: 'If you have any questions, feel free to reach out to our support team.',
    },
    passwordReset: {
      subject: 'Reset Your Password - React Google Maps API',
      title: 'Reset Your Password',
      body: 'You requested to reset your password for your React Google Maps API account. Click the button below to reset your password.',
      expires: 'This link will expire in 1 hour.',
      cta: 'Reset Password →',
      ignore:
        "If you didn't request this, you can safely ignore this email. Your password will remain unchanged.",
      copyLink: 'Or copy and paste this link into your browser:',
    },
    passwordChanged: {
      subject: 'Password Changed - React Google Maps API',
      title: 'Password Changed Successfully ✓',
      body: 'Your password has been successfully changed.',
      ifYou: 'If you made this change, no further action is required.',
      ifNot:
        'If you did not make this change, please contact our support team immediately or reset your password:',
      cta: 'Reset Password →',
    },
    purchase: {
      subject: 'Your License Key - React Google Maps API 🗺️',
      title: 'Thank You for Your Purchase! 🎉',
      body: 'Your commercial license for React Google Maps API has been activated.',
      licenseKey: 'License Key:',
      validUntil: 'Valid Until:',
      includes: 'Your license includes:',
      items: [
        'Full access to all components',
        'Commercial use in unlimited projects',
        'Priority support',
        'All updates for one year',
      ],
      cta: 'View Dashboard →',
      keepEmail:
        'Keep this email for your records. You can always find your license key in your dashboard.',
    },
    common: { copyright: '© {year} React Google Maps API. All rights reserved.' },
  },
  es: {
    welcome: {
      subject: '¡Bienvenido a React Google Maps API! 🗺️',
      greeting: '¡Bienvenido! 🎉',
      greetingName: '¡Hola {name}! 🎉',
      body: 'Gracias por crear una cuenta en React Google Maps API. Ahora tienes acceso a la biblioteca React más popular para Google Maps.',
      items: [
        'Explora nuestra documentación completa',
        'Revisa ejemplos de código y componentes',
        'Obtén una licencia comercial para tus proyectos',
      ],
      cta: 'Ver Documentación →',
      footer: 'Si tienes alguna pregunta, no dudes en contactar a nuestro equipo de soporte.',
    },
    passwordReset: {
      subject: 'Restablecer Contraseña - React Google Maps API',
      title: 'Restablecer tu Contraseña',
      body: 'Solicitaste restablecer la contraseña de tu cuenta. Haz clic en el botón para restablecer tu contraseña.',
      expires: 'Este enlace expirará en 1 hora.',
      cta: 'Restablecer Contraseña →',
      ignore:
        'Si no solicitaste esto, puedes ignorar este correo. Tu contraseña permanecerá sin cambios.',
      copyLink: 'O copia y pega este enlace en tu navegador:',
    },
    passwordChanged: {
      subject: 'Contraseña Cambiada - React Google Maps API',
      title: 'Contraseña Cambiada Exitosamente ✓',
      body: 'Tu contraseña ha sido cambiada exitosamente.',
      ifYou: 'Si realizaste este cambio, no se requiere ninguna acción adicional.',
      ifNot:
        'Si no realizaste este cambio, contacta a nuestro equipo de soporte o restablece tu contraseña:',
      cta: 'Restablecer Contraseña →',
    },
    purchase: {
      subject: 'Tu Clave de Licencia - React Google Maps API 🗺️',
      title: '¡Gracias por tu Compra! 🎉',
      body: 'Tu licencia comercial para React Google Maps API ha sido activada.',
      licenseKey: 'Clave de Licencia:',
      validUntil: 'Válida Hasta:',
      includes: 'Tu licencia incluye:',
      items: [
        'Acceso completo a todos los componentes',
        'Uso comercial en proyectos ilimitados',
        'Soporte prioritario',
        'Todas las actualizaciones por un año',
      ],
      cta: 'Ver Panel →',
      keepEmail:
        'Guarda este correo para tus registros. Siempre puedes encontrar tu clave de licencia en tu panel.',
    },
    common: { copyright: '© {year} React Google Maps API. Todos los derechos reservados.' },
  },
  de: {
    welcome: {
      subject: 'Willkommen bei React Google Maps API! 🗺️',
      greeting: 'Willkommen! 🎉',
      greetingName: 'Hallo {name}! 🎉',
      body: 'Vielen Dank für die Erstellung eines Kontos bei React Google Maps API. Sie haben nun Zugang zur beliebtesten React-Bibliothek für Google Maps.',
      items: [
        'Erkunden Sie unsere umfassende Dokumentation',
        'Sehen Sie sich Codebeispiele und Komponenten an',
        'Erhalten Sie eine kommerzielle Lizenz für Ihre Projekte',
      ],
      cta: 'Dokumentation ansehen →',
      footer: 'Bei Fragen wenden Sie sich gerne an unser Support-Team.',
    },
    passwordReset: {
      subject: 'Passwort zurücksetzen - React Google Maps API',
      title: 'Passwort zurücksetzen',
      body: 'Sie haben angefordert, Ihr Passwort zurückzusetzen. Klicken Sie auf die Schaltfläche, um Ihr Passwort zurückzusetzen.',
      expires: 'Dieser Link läuft in 1 Stunde ab.',
      cta: 'Passwort zurücksetzen →',
      ignore: 'Wenn Sie dies nicht angefordert haben, können Sie diese E-Mail ignorieren.',
      copyLink: 'Oder kopieren Sie diesen Link in Ihren Browser:',
    },
    passwordChanged: {
      subject: 'Passwort geändert - React Google Maps API',
      title: 'Passwort erfolgreich geändert ✓',
      body: 'Ihr Passwort wurde erfolgreich geändert.',
      ifYou: 'Wenn Sie diese Änderung vorgenommen haben, ist keine weitere Aktion erforderlich.',
      ifNot:
        'Wenn Sie diese Änderung nicht vorgenommen haben, kontaktieren Sie unser Support-Team:',
      cta: 'Passwort zurücksetzen →',
    },
    purchase: {
      subject: 'Ihr Lizenzschlüssel - React Google Maps API 🗺️',
      title: 'Vielen Dank für Ihren Kauf! 🎉',
      body: 'Ihre kommerzielle Lizenz für React Google Maps API wurde aktiviert.',
      licenseKey: 'Lizenzschlüssel:',
      validUntil: 'Gültig bis:',
      includes: 'Ihre Lizenz beinhaltet:',
      items: [
        'Vollständiger Zugang zu allen Komponenten',
        'Kommerzielle Nutzung in unbegrenzten Projekten',
        'Prioritäts-Support',
        'Alle Updates für ein Jahr',
      ],
      cta: 'Dashboard ansehen →',
      keepEmail: 'Bewahren Sie diese E-Mail für Ihre Unterlagen auf.',
    },
    common: { copyright: '© {year} React Google Maps API. Alle Rechte vorbehalten.' },
  },
  fr: {
    welcome: {
      subject: 'Bienvenue sur React Google Maps API ! 🗺️',
      greeting: 'Bienvenue ! 🎉',
      greetingName: 'Bonjour {name} ! 🎉',
      body: "Merci d'avoir créé un compte sur React Google Maps API. Vous avez maintenant accès à la bibliothèque React la plus populaire pour Google Maps.",
      items: [
        'Explorez notre documentation complète',
        'Découvrez les exemples de code et composants',
        'Obtenez une licence commerciale pour vos projets',
      ],
      cta: 'Voir la Documentation →',
      footer: "Si vous avez des questions, n'hésitez pas à contacter notre équipe de support.",
    },
    passwordReset: {
      subject: 'Réinitialiser le mot de passe - React Google Maps API',
      title: 'Réinitialiser votre mot de passe',
      body: 'Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton pour réinitialiser.',
      expires: 'Ce lien expirera dans 1 heure.',
      cta: 'Réinitialiser le mot de passe →',
      ignore: "Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email.",
      copyLink: 'Ou copiez et collez ce lien dans votre navigateur :',
    },
    passwordChanged: {
      subject: 'Mot de passe modifié - React Google Maps API',
      title: 'Mot de passe modifié avec succès ✓',
      body: 'Votre mot de passe a été modifié avec succès.',
      ifYou: "Si vous avez effectué ce changement, aucune action supplémentaire n'est requise.",
      ifNot: "Si vous n'avez pas effectué ce changement, contactez notre équipe de support :",
      cta: 'Réinitialiser le mot de passe →',
    },
    purchase: {
      subject: 'Votre clé de licence - React Google Maps API 🗺️',
      title: 'Merci pour votre achat ! 🎉',
      body: 'Votre licence commerciale pour React Google Maps API a été activée.',
      licenseKey: 'Clé de licence :',
      validUntil: "Valide jusqu'au :",
      includes: 'Votre licence inclut :',
      items: [
        'Accès complet à tous les composants',
        'Utilisation commerciale dans des projets illimités',
        'Support prioritaire',
        'Toutes les mises à jour pendant un an',
      ],
      cta: 'Voir le Tableau de bord →',
      keepEmail: 'Conservez cet email pour vos archives.',
    },
    common: { copyright: '© {year} React Google Maps API. Tous droits réservés.' },
  },
  ru: {
    welcome: {
      subject: 'Добро пожаловать в React Google Maps API! 🗺️',
      greeting: 'Добро пожаловать! 🎉',
      greetingName: 'Привет, {name}! 🎉',
      body: 'Спасибо за создание аккаунта в React Google Maps API. Теперь у вас есть доступ к самой популярной React библиотеке для Google Maps.',
      items: [
        'Изучите нашу документацию',
        'Посмотрите примеры кода и компоненты',
        'Получите коммерческую лицензию для ваших проектов',
      ],
      cta: 'Смотреть документацию →',
      footer: 'Если у вас есть вопросы, свяжитесь с нашей службой поддержки.',
    },
    passwordReset: {
      subject: 'Сброс пароля - React Google Maps API',
      title: 'Сбросить пароль',
      body: 'Вы запросили сброс пароля для вашего аккаунта. Нажмите кнопку ниже, чтобы сбросить пароль.',
      expires: 'Эта ссылка истечёт через 1 час.',
      cta: 'Сбросить пароль →',
      ignore: 'Если вы не запрашивали это, можете проигнорировать это письмо.',
      copyLink: 'Или скопируйте эту ссылку в браузер:',
    },
    passwordChanged: {
      subject: 'Пароль изменён - React Google Maps API',
      title: 'Пароль успешно изменён ✓',
      body: 'Ваш пароль был успешно изменён.',
      ifYou: 'Если вы сделали это изменение, никаких дополнительных действий не требуется.',
      ifNot: 'Если вы не делали это изменение, свяжитесь с нашей службой поддержки:',
      cta: 'Сбросить пароль →',
    },
    purchase: {
      subject: 'Ваш лицензионный ключ - React Google Maps API 🗺️',
      title: 'Спасибо за покупку! 🎉',
      body: 'Ваша коммерческая лицензия React Google Maps API активирована.',
      licenseKey: 'Лицензионный ключ:',
      validUntil: 'Действителен до:',
      includes: 'Ваша лицензия включает:',
      items: [
        'Полный доступ ко всем компонентам',
        'Коммерческое использование в неограниченных проектах',
        'Приоритетная поддержка',
        'Все обновления в течение года',
      ],
      cta: 'Панель управления →',
      keepEmail: 'Сохраните это письмо. Вы всегда можете найти ключ в панели управления.',
    },
    common: { copyright: '© {year} React Google Maps API. Все права защищены.' },
  },
  it: {
    welcome: {
      subject: 'Benvenuto in React Google Maps API! 🗺️',
      greeting: 'Benvenuto! 🎉',
      greetingName: 'Ciao {name}! 🎉',
      body: 'Grazie per aver creato un account su React Google Maps API. Ora hai accesso alla libreria React più popolare per Google Maps.',
      items: [
        'Esplora la nostra documentazione completa',
        'Scopri esempi di codice e componenti',
        'Ottieni una licenza commerciale per i tuoi progetti',
      ],
      cta: 'Vedi Documentazione →',
      footer: 'Se hai domande, non esitare a contattare il nostro team di supporto.',
    },
    passwordReset: {
      subject: 'Reimposta Password - React Google Maps API',
      title: 'Reimposta la tua Password',
      body: 'Hai richiesto di reimpostare la password del tuo account. Clicca il pulsante per reimpostare.',
      expires: 'Questo link scadrà tra 1 ora.',
      cta: 'Reimposta Password →',
      ignore: 'Se non hai richiesto questo, puoi ignorare questa email.',
      copyLink: 'Oppure copia e incolla questo link nel tuo browser:',
    },
    passwordChanged: {
      subject: 'Password Modificata - React Google Maps API',
      title: 'Password Modificata con Successo ✓',
      body: 'La tua password è stata modificata con successo.',
      ifYou: 'Se hai effettuato questa modifica, non è richiesta alcuna azione.',
      ifNot: 'Se non hai effettuato questa modifica, contatta il nostro team di supporto:',
      cta: 'Reimposta Password →',
    },
    purchase: {
      subject: 'La tua Chiave di Licenza - React Google Maps API 🗺️',
      title: 'Grazie per il tuo Acquisto! 🎉',
      body: 'La tua licenza commerciale per React Google Maps API è stata attivata.',
      licenseKey: 'Chiave di Licenza:',
      validUntil: 'Valida fino al:',
      includes: 'La tua licenza include:',
      items: [
        'Accesso completo a tutti i componenti',
        'Uso commerciale in progetti illimitati',
        'Supporto prioritario',
        'Tutti gli aggiornamenti per un anno',
      ],
      cta: 'Vedi Dashboard →',
      keepEmail: 'Conserva questa email per i tuoi archivi.',
    },
    common: { copyright: '© {year} React Google Maps API. Tutti i diritti riservati.' },
  },
  ja: {
    welcome: {
      subject: 'React Google Maps APIへようこそ！🗺️',
      greeting: 'ようこそ！🎉',
      greetingName: 'こんにちは、{name}さん！🎉',
      body: 'React Google Maps APIのアカウントを作成いただきありがとうございます。Google Maps用の最も人気のあるReactライブラリにアクセスできます。',
      items: [
        '包括的なドキュメントを探索',
        'コード例とコンポーネントをチェック',
        'プロジェクト用の商用ライセンスを取得',
      ],
      cta: 'ドキュメントを見る →',
      footer: 'ご質問がありましたら、サポートチームまでお気軽にお問い合わせください。',
    },
    passwordReset: {
      subject: 'パスワードリセット - React Google Maps API',
      title: 'パスワードをリセット',
      body: 'アカウントのパスワードリセットがリクエストされました。下のボタンをクリックしてリセットしてください。',
      expires: 'このリンクは1時間で期限切れになります。',
      cta: 'パスワードをリセット →',
      ignore: 'リクエストしていない場合は、このメールを無視してください。',
      copyLink: 'または、このリンクをブラウザにコピー＆ペースト：',
    },
    passwordChanged: {
      subject: 'パスワード変更完了 - React Google Maps API',
      title: 'パスワードが正常に変更されました ✓',
      body: 'パスワードが正常に変更されました。',
      ifYou: 'この変更を行った場合、追加のアクションは必要ありません。',
      ifNot: 'この変更を行っていない場合は、サポートチームにお問い合わせください：',
      cta: 'パスワードをリセット →',
    },
    purchase: {
      subject: 'ライセンスキー - React Google Maps API 🗺️',
      title: 'ご購入ありがとうございます！🎉',
      body: 'React Google Maps APIの商用ライセンスが有効になりました。',
      licenseKey: 'ライセンスキー：',
      validUntil: '有効期限：',
      includes: 'ライセンスに含まれるもの：',
      items: [
        'すべてのコンポーネントへのフルアクセス',
        '無制限プロジェクトでの商用利用',
        '優先サポート',
        '1年間のすべてのアップデート',
      ],
      cta: 'ダッシュボードを見る →',
      keepEmail: 'このメールを記録として保管してください。',
    },
    common: { copyright: '© {year} React Google Maps API. All rights reserved.' },
  },
  'zh-CN': {
    welcome: {
      subject: '欢迎使用 React Google Maps API！🗺️',
      greeting: '欢迎！🎉',
      greetingName: '你好，{name}！🎉',
      body: '感谢您创建 React Google Maps API 账户。您现在可以访问最受欢迎的 Google Maps React 库。',
      items: ['探索我们的完整文档', '查看代码示例和组件', '为您的项目获取商业许可'],
      cta: '查看文档 →',
      footer: '如有任何问题，请随时联系我们的支持团队。',
    },
    passwordReset: {
      subject: '重置密码 - React Google Maps API',
      title: '重置您的密码',
      body: '您请求重置账户密码。点击下方按钮重置密码。',
      expires: '此链接将在1小时后过期。',
      cta: '重置密码 →',
      ignore: '如果您没有请求此操作，可以忽略此邮件。',
      copyLink: '或复制此链接到浏览器：',
    },
    passwordChanged: {
      subject: '密码已更改 - React Google Maps API',
      title: '密码更改成功 ✓',
      body: '您的密码已成功更改。',
      ifYou: '如果是您进行的更改，无需其他操作。',
      ifNot: '如果不是您进行的更改，请联系支持团队：',
      cta: '重置密码 →',
    },
    purchase: {
      subject: '您的许可证密钥 - React Google Maps API 🗺️',
      title: '感谢您的购买！🎉',
      body: '您的 React Google Maps API 商业许可证已激活。',
      licenseKey: '许可证密钥：',
      validUntil: '有效期至：',
      includes: '您的许可证包括：',
      items: ['完全访问所有组件', '无限项目的商业使用', '优先支持', '一年内所有更新'],
      cta: '查看仪表板 →',
      keepEmail: '请保存此邮件作为记录。您可以随时在仪表板中找到许可证密钥。',
    },
    common: { copyright: '© {year} React Google Maps API. 保留所有权利。' },
  },
  'zh-TW': {
    welcome: {
      subject: '歡迎使用 React Google Maps API！🗺️',
      greeting: '歡迎！🎉',
      greetingName: '你好，{name}！🎉',
      body: '感謝您建立 React Google Maps API 帳戶。您現在可以存取最受歡迎的 Google Maps React 函式庫。',
      items: ['探索我們的完整文件', '查看程式碼範例和元件', '為您的專案取得商業授權'],
      cta: '查看文件 →',
      footer: '如有任何問題，請隨時聯繫我們的支援團隊。',
    },
    passwordReset: {
      subject: '重設密碼 - React Google Maps API',
      title: '重設您的密碼',
      body: '您請求重設帳戶密碼。點擊下方按鈕重設密碼。',
      expires: '此連結將在1小時後過期。',
      cta: '重設密碼 →',
      ignore: '如果您沒有請求此操作，可以忽略此郵件。',
      copyLink: '或複製此連結到瀏覽器：',
    },
    passwordChanged: {
      subject: '密碼已變更 - React Google Maps API',
      title: '密碼變更成功 ✓',
      body: '您的密碼已成功變更。',
      ifYou: '如果是您進行的變更，無需其他操作。',
      ifNot: '如果不是您進行的變更，請聯繫支援團隊：',
      cta: '重設密碼 →',
    },
    purchase: {
      subject: '您的授權金鑰 - React Google Maps API 🗺️',
      title: '感謝您的購買！🎉',
      body: '您的 React Google Maps API 商業授權已啟用。',
      licenseKey: '授權金鑰：',
      validUntil: '有效期至：',
      includes: '您的授權包括：',
      items: ['完全存取所有元件', '無限專案的商業使用', '優先支援', '一年內所有更新'],
      cta: '查看儀表板 →',
      keepEmail: '請保存此郵件作為記錄。您可以隨時在儀表板中找到授權金鑰。',
    },
    common: { copyright: '© {year} React Google Maps API. 保留所有權利。' },
  },
};

export function getEmailTexts(locale: string): EmailTexts {
  const supportedLocale = (Object.keys(texts).includes(locale) ? locale : 'en') as SupportedLocale;
  return texts[supportedLocale];
}
