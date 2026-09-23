import { NavLink } from 'react-router-dom';

export const AppNavigation = () => {
  return (
    <nav
      className="
        mb-5
        flex
        items-center
        gap-2
      "
      aria-label="Main navigation"
    >
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `
            rounded-lg
            px-4
            py-2
            text-sm
            font-medium
            transition
            ${
              isActive
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }
          `
        }
      >
        Management
      </NavLink>

      <NavLink
        to="/public"
        className={({ isActive }) =>
          `
            rounded-lg
            px-4
            py-2
            text-sm
            font-medium
            transition
            ${
              isActive
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }
          `
        }
      >
        Public View
      </NavLink>
    </nav>
  );
};