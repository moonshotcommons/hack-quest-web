declare namespace Api {
  namespace Common {
    interface PaginationCommonParams {
      page: number | string;
      limit: number | string;
      keyword: string;
    }
  }

  namespace Courses {
    interface CourseSearchParams extends Common.PaginationCommonParams {
      ecosystem: string;
      track: string;
      language: string;
    }
  }
}
