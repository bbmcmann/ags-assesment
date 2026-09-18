export const roundMoney = (x: number) => {
  return Math.trunc(x * 100) / 100;
};

export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
};
