export function validateDate(value) {
  if (!value) return false;

  value = value.trim();

  // Case 1: dd-mm-yyyy
  const regexCase1 = /^\d{2}-\d{2}-\d{4}$/;

  if (regexCase1.test(value)) {
    const [dd, mm, yyyy] = value.split("-").map(Number);

    // Month must be 1–12, Day must be 1–31
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return false;

    // Construct real date
    const date = new Date(yyyy, mm - 1, dd);
    return (
      date.getFullYear() === yyyy &&
      date.getMonth() === mm - 1 &&
      date.getDate() === dd
    );
  }

  // Case 2: mm-dd-yyyy HH:MM:SS AM/PM
  const regexCase2 =
    /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2} (AM|PM)$/i;

  if (regexCase2.test(value)) {
    const [datePart, timePart, ampm] = value.split(" ");
    const [mm, dd, yyyy] = datePart.split("-").map(Number);
    const [HH, MM, SS] = timePart.split(":").map(Number);

    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return false;

    // time check
    if (HH < 1 || HH > 12 || MM > 59 || SS > 59) return false;

    // Construct date
    let hours = HH;
    if (ampm.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;

    const date = new Date(yyyy, mm - 1, dd, hours, MM, SS);

    return (
      date.getFullYear() === yyyy &&
      date.getMonth() === mm - 1 &&
      date.getDate() === dd &&
      date.getHours() === hours &&
      date.getMinutes() === MM &&
      date.getSeconds() === SS
    );
  }

  return false; // Not matching any pattern
}