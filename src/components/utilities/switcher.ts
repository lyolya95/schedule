export const switchTypeToColor = (typeName: string) => {
  let color = typeName;
  switch (typeName) {
    case 'live':
    case 'youtube live':
    case 'self education':
    case 'html/css academy':
      color = 'blue';
      break;
    case 'deadline':
      color = 'magenta';
      break;
    case 'выдача таска':
    case 'codewars':
    case 'CodeJam':
    case 'js task':
    case 'html task':
    case 'task':
      color = 'green';
      break;
    case 'test':
    case 'final test':
      color = 'geekblue';
      break;
    case 'cross-check':
    case 'markdown':
    case 'html':
      color = 'purple';
      break;
    case 'регистрация':
    case 'митап':
      color = 'gold';
      break;
    case 'stage-interview':
    case 'interview':
      color = 'volcano';
      break;
    default:
      color = 'lime';
  }
  return color;
};
