
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiChartSquareBar,
  HiLockClosed,
  HiSearch,
  HiShoppingBag,
  HiViewGrid,
  HiOutlineBookOpen,
  HiPresentationChartLine,
  HiUser,
  HiDocumentReport,
  HiUserGroup,
} from "react-icons/hi";

import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";

const ExampleSidebar: FC = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();

  const [currentPage, setCurrentPage] = useState("");
  const [isEcommerceOpen, setEcommerceOpen] = useState(true);

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setEcommerceOpen(newPage.includes("/e-commerce/"));
 
  }, [setCurrentPage, setEcommerceOpen]);

  return (
    <div
      className={classNames("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        collapsed={isSidebarOpenOnSmallScreens && !isSmallScreen()}
      >
        <div className="flex h-full flex-col justify-between py-2">
          <div>
            <form className="pb-3 md:hidden">
              <TextInput
                icon={HiSearch}
                type="search"
                placeholder="Search"
                required
                size={32}
              />
            </form>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="/"
                  icon={HiChartPie}
                  className={
                    "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                  }
                >
                  Dashboard
                </Sidebar.Item>
              <Sidebar.Item
                  href="/courses/courses"
                  icon={HiOutlineBookOpen}
                  className={
                    "/courses/courses" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Courses
                </Sidebar.Item>
<Sidebar.Item
                  href="/sessions/sessions"
                  icon={HiPresentationChartLine}
                  className={
                    "/sessions/sessions" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Sessions
                </Sidebar.Item>
<Sidebar.Item
                  href="/reports/reports"
                  icon={HiDocumentReport}
                  className={
                    "/reports/reports" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Reports
                </Sidebar.Item>
<Sidebar.Item
                  href="/participants/participants"
                  icon={HiUserGroup}
                  className={
                    "/participants/participants" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Participants
                </Sidebar.Item>
<Sidebar.Item
                  href="/facilitators/facilitators"
                  icon={HiUser}
                  className={
                    "/facilitators/facilitators" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Facilitators
                </Sidebar.Item>
              </Sidebar.ItemGroup>
              
            </Sidebar.Items>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};


export default ExampleSidebar;
    