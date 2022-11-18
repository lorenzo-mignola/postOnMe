import { format } from "date-fns";

const formatDate = (dateRaw: Date | string) => format(new Date(dateRaw), "dd.MM.yyyy HH:mm");

export default formatDate;
