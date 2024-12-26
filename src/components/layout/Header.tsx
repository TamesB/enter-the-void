import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@radix-ui/react-navigation-menu';

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">tamesb.io</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-6">
            <NavigationMenuItem>
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50">
                Home
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </header>
  );
}