import { FC } from "react"
import { Helmet } from "react-helmet-async"

interface Props {
  title: string
}

const AppTitle: FC<Props> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" type="image/ico" href="/favicon.ico" />
    </Helmet>
  )
}

export default AppTitle
