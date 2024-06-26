function calculateTimes() {
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;

  if (!startTime || !endTime) {
    Swal.fire({
      text: "لطفاً هر دو ساعت ورود و خروج را وارد کنید",
      icon: "error",
      confirmButtonText: "متوجه شدم",
    });
    return;
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = new Date();
  start.setHours(startHour, startMinute);

  const end = new Date();
  end.setHours(endHour, endMinute);

  const diffTime = (end - start) / 1000 / 60;

  const workHours = Math.floor(diffTime / 60);
  const workMinutes = diffTime % 60;

  const requiredWorkMinutes = 8 * 60 + 45;
  const overTimeMinutes = diffTime - requiredWorkMinutes;

  document.getElementById("result").innerHTML = `
    <p>مجموع ساعات کاری: ${workHours}:${workMinutes
    .toString()
    .padStart(2, "0")}</p>
  `;

  if (overTimeMinutes > 0) {
    const overTimeHours = Math.floor(overTimeMinutes / 60);
    const overTimeRemainingMinutes = overTimeMinutes % 60;

    const overTimeStart = new Date(
      start.getTime() + requiredWorkMinutes * 60 * 1000
    );
    const overTimeStartHour = overTimeStart.getHours();
    const overTimeStartMinute = overTimeStart.getMinutes();

    document.getElementById("result").innerHTML += `
      <p>ساعت شروع اضافه‌کاری: ${overTimeStartHour}:${overTimeStartMinute
      .toString()
      .padStart(2, "0")}</p>
      <p>مجموع ساعات اضافه‌کاری: ${overTimeHours}:${overTimeRemainingMinutes
      .toString()
      .padStart(2, "0")}</p>
    `;

    Swal.fire({
      toast: true,
      icon: "success",
      title: "اضافه کاری با موفقیت محاسبه شد",
      animation: false,
      position: "top-start",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  } else if (overTimeMinutes < 0) {
    const underTimeMinutes = -overTimeMinutes;
    const underTimeHours = Math.floor(underTimeMinutes / 60);
    const underTimeRemainingMinutes = underTimeMinutes % 60;

    document.getElementById("result").innerHTML += `
      <p>مجموع ساعات کسر کار: ${underTimeHours}:${underTimeRemainingMinutes
      .toString()
      .padStart(2, "0")}</p>
    `;

    Swal.fire({
      toast: true,
      icon: "warning",
      title: "کسر کار محاسبه شد",
      animation: false,
      position: "top-start",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  }
}

// Event listener for "Enter" key press
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    document.getElementById("calculate-button").click();
  }
});
