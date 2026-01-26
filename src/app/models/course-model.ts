export interface Course {
  id: string,
  title: string,
  description: string,
  creationDate: Date,
  language: string,
  duration:  number,
  price: number,
  lessons: number,
  students: number,
  authors: string[],
  authorsName?: string[],
  url?: string,
}
