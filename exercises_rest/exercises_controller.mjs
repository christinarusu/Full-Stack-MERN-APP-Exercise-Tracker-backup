/**
Christina Rusu
 */
export function isValid(req) {
  const body = req.body;
  const format = /^\d\d-\d\d-\d\d$/;

  if (!body.name || !body.reps || !body.weight || !body.unit || !body.date) return false;
  if (typeof body.name !== 'string' || typeof body.reps !== 'number' ||
      typeof body.weight !== 'number' || typeof body.unit !== 'string' ||
      typeof body.date !== 'string') return false;
  if (body.reps <= 0 || body.weight <= 0) return false;
  if (body.unit !== 'lbs' && body.unit !== 'kgs') return false;
  if (!format.test(body.date)) return false;

  // validate date
  const [month, day, year] = body.date.split("-").map(Number);
  if (month < 1 || month > 12) return false;
  if ([1,3,5,7,8,10,12].includes(month) && (day < 1 || day > 31)) return false;
  if ([4,6,9,11].includes(month) && (day < 1 || day > 30)) return false;
  if (month === 2) {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (isLeap && (day < 1 || day > 29)) return false;
    if (!isLeap && (day < 1 || day > 28)) return false;
  }

  return true;
}









