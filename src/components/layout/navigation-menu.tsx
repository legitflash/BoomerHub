
import { getAllCategories } from '@/services/category-service';
import { Header } from './header';

// This is a Server Component that fetches data and passes it to the client.
export default async function NavigationMenu() {
  const categories = await getAllCategories();
  const uniqueCategories = categories.filter(
    (category, index, self) =>
      index === self.findIndex((c) => c.slug === category.slug)
  );

  return <Header blogCategories={uniqueCategories} />;
}
