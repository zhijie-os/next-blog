import { parseISO, format } from 'date-fns'

export default function Date({ dateString, pattern = 'MMM yyyy' }:{dateString:string; pattern?:string}) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, pattern)}</time>
}
