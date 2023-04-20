import { FC } from "react"
import { Link } from "react-router-dom"
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid"
import { IPage } from "@/types/layout.type"

interface PageItemProps {
  page: IPage
}

const PageItem: FC<PageItemProps> = ({ page }) => {
  return (
    <li className="flex items-center">
      <ChevronRightIcon
        className="h-5 w-5 flex-shrink-0 text-gray-400"
        aria-hidden="true"
      />
      <Link
        to={page.route}
        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
        aria-current={page.current ? "page" : undefined}
      >
        {page.name}
      </Link>
    </li>
  )
}

interface PageProps {
  pages?: IPage[]
  name?: string
}

const Breadcrumbs: FC<PageProps> = ({ pages, name }) => {
  return (
    <div className="section-md mt-4">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <Link to="/" className="text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          {/*! Multiple pages  */}
          {pages &&
            pages.map((page, idx) => <PageItem key={idx} page={page} />)}

          {/*! Only one page */}
          {name && <PageItem page={{ route: "", name: name, current: true }} />}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumbs
