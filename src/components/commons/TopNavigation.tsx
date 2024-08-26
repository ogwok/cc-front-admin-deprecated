
import { Breadcrumb } from "flowbite-react";
import { FC } from "react";
import { HiHome } from "react-icons/hi";

const TopNavigation: FC = function () {
    return (
        <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="#">
          <div className="flex items-center gap-x-3">
            <HiHome className="text-xl" />
            <span className="dark:text-white">Home</span>
          </div>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/e-commerce/products">
          Sessions
        </Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
    );
};

export default TopNavigation;
    