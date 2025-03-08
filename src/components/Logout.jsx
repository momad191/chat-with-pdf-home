import { doLogout } from "@/app/actions"
import { GrSecure } from "react-icons/gr";
import {useTranslations} from 'next-intl';
const Logout = () => {
  const t = useTranslations('Logout');
  return (
    <form action={doLogout}>
        <button className="flex justify-center items-center gap-1 bg-red-500 hover:bg-red-900 my-2 text-sm text-white px-8 py-2 rounded" type="submit">
          <GrSecure /> {t('Logout')}</button>
    </form>
  )
}

export default Logout