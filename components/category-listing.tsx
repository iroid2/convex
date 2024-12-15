import Link from "next/link";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  title: string;
  slug: string;
};

type CategoryListingProps = {
  categories: Category[];
};

export function CategoryListing({ categories }: CategoryListingProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <Button variant="outline" asChild key={category.id}>
          <Link href={`/category/${category.slug}`}>{category.title}</Link>
        </Button>
      ))}
    </div>
  );
}
