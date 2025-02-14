import React from "react";
import { NavLink, useLocation } from "react-router-dom";  // Importação dos componentes do React Router

// Lista de links que serão exibidos no menu de navegação
const links = [
  {
    name: "Today's tasks",  // Nome do link
    path: "/today",  // Caminho para a página "Today's tasks"
  },
  {
    name: "All tasks",  // Nome do link
    path: "/",  // Caminho para a página "All tasks"
  },
  {
    name: "Important tasks",  // Nome do link
    path: "/important",  // Caminho para a página "Important tasks"
  },
  {
    name: "Completed tasks",  // Nome do link
    path: "/completed",  // Caminho para a página "Completed tasks"
  },
  {
    name: "Uncompleted tasks",  // Nome do link
    path: "/uncompleted",  // Caminho para a página "Uncompleted tasks"
  },
];

const NavLinks: React.FC<{ classActive: string }> = ({ classActive }) => {
  const route = useLocation();  // Hook do React Router para acessar a localização atual da URL
  const currentPath = route.pathname;  // Obtém o caminho da URL atual

  return (
    <nav>
      {/* A lista de links */}
      <ul className="grid gap-2">
        {links.map((link) => (
          <li key={link.path}>
            {/* O NavLink ativa a navegação para a rota desejada */}
            <NavLink
              to={link.path}  // Define o caminho de navegação
              className={`px-4 py-2 w-full block transition hover:text-black-600 dark:hover:text-slate-200 ${
                currentPath === link.path ? classActive : ""  // Aplica a classe ativa se o caminho for igual ao atual
              }`}
            >
              {link.name}  {/* Nome do link */}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
