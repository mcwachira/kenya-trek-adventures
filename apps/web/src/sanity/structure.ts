// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: any) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) =>
          item.getId() &&
          !["blogPost", "category", "author"].includes(item.getId()!),
      ),
    ]);
