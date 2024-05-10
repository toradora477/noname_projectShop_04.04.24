import dayjs from 'dayjs';
import 'dayjs/locale/uk';
dayjs.locale('uk');

const getFormattedDateWithRelativeDays = (itemTime) => {
  const isDayjsInstance = (value) => {
    return value && typeof value === 'object' && '$d' in value;
  };

  const isDateInstance = (value) => {
    return value instanceof Date;
  };

  const isString = (value) => {
    return typeof value === 'string' ? value.trim() !== '' : false;
  };

  const isDayjsValid = (value) => {
    return dayjs(value).isValid();
  };

  const isDateValid = (value) => {
    return !isNaN(new Date(value));
  };

  if (!isDayjsInstance(itemTime) && !isDateInstance(itemTime)) {
    if (isString(itemTime)) {
      if (!isDayjsValid(itemTime) || !isDateValid(itemTime)) return '-';
    } else return '-';
  }

  const itemDate = dayjs(itemTime),
    currentDate = dayjs();

  const [isToday, isYesterday, isTomorrow] = [
    itemDate.isSame(currentDate, 'day'),
    itemDate.isSame(currentDate.subtract(1, 'day'), 'day'),
    itemDate.isSame(currentDate.add(1, 'day'), 'day'),
  ];

  return (
    {
      [isToday]: 'Сьогодні',
      [isYesterday]: 'Вчора',
      [isTomorrow]: 'Завтра',
    }[true] || itemDate.format('DD.MM.YYYY')
  );
};

export { getFormattedDateWithRelativeDays };
