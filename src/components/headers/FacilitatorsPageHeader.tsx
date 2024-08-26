
  import { Breadcrumb } from "flowbite-react";
  import { FC } from "react";
  import { HiHome } from "react-icons/hi";
  import FacilitatorsAddModal from "../modals/FacilitatorsAddModal";
  
  const FacilitatorsPageHeader: FC = function () {
      return (
          <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
            <div className="mb-1 w-full">
              <div className="mb-4">
                <Breadcrumb className="mb-4">
                  <Breadcrumb.Item href="#">
                    <div className="flex items-center gap-x-3">
                      <HiHome className="text-xl" />
                      <span className="dark:text-white">Home</span>
                    </div>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="/e-commerce/products">
                    Facilitators
                  </Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  All facilitators
                </h1>
              </div>
              <FacilitatorsAddModal />
            </div>
          </div>
      );
  };
  
  export default FacilitatorsPageHeader;
      