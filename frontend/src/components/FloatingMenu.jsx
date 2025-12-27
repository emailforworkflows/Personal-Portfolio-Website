import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Mail, Printer, Phone, Accessibility } from 'lucide-react';
import { profileData } from '../data/mock';

const FloatingMenu = ({ onPrint }) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      href: profileData.linkedIn,
      external: true,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      href: `mailto:${profileData.email}`,
      external: false,
      color: 'hover:bg-red-500 hover:text-white'
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Phone',
      href: `tel:${profileData.phone}`,
      external: false,
      color: 'hover:bg-green-600 hover:text-white'
    },
    {
      id: 'print',
      icon: Printer,
      label: t('header.print'),
      onClick: onPrint,
      color: 'hover:bg-slate-700 hover:text-white'
    },
    {
      id: 'accessibility',
      icon: Accessibility,
      label: t('footer.accessibility'),
      href: '/accessibility',
      external: false,
      color: 'hover:bg-purple-600 hover:text-white'
    }
  ];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        
        if (item.onClick) {
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`group relative flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 text-slate-600 transition-all duration-300 ${item.color}`}
              aria-label={item.label}
            >
              <Icon size={20} />
              {/* Tooltip */}
              <span className="absolute left-14 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <a
            key={item.id}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className={`group relative flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 text-slate-600 transition-all duration-300 ${item.color}`}
            aria-label={item.label}
          >
            <Icon size={20} />
            {/* Tooltip */}
            <span className="absolute left-14 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default FloatingMenu;
