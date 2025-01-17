import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HiSlash } from "react-icons/hi2";
import React from "react";
import usePathname from "@/hooks/use-pathname";
import { useIntl } from "react-intl";
import { useParams } from "react-router";
import { getPageHeader } from "@/lib/data";
import CLink from "../custom/c-link";
import useSearchParams from "@/hooks/use-search-params";
import { useLinkRoutes } from "@/lib/route";
import { cleanWords } from "@/lib/utils";

const PageHeader = () => {
  const routeParams = useParams();
  const searchParam = useSearchParams();
  const { locale } = useIntl();
  let pathname = usePathname();
  const extraLinks = [];
  const routes = useLinkRoutes();

  pathname = pathname.replace(
    routeParams.id ? `/${routeParams.id ?? ""}` : "",
    ""
  );

  const pageHeaderData = getPageHeader(pathname);

  if (searchParam.get("paths")) {
    const individualPaths = searchParam.get("paths")?.split("/") ?? [];

    const linksArr = individualPaths.map((each) => each.split("$")).slice(2);

    linksArr?.map((each, index) => {
      const obj = {
        value: each[0],
        current: index === linksArr.length - 1,
      };

      if (index !== linksArr.length - 1 && each.length >= 3) {
        obj["path"] = () => routes.layerPriority().replace(`/${locale}`, "");
      }

      if (each.length >= 3) {
        obj["search"] = () =>
          `?src=${each[0]}&paths=${individualPaths
            .slice(0, index + 3)
            .join("/")}&layer=${each[1].split("=")[1]}&parentId=${
            each[2].split("=")[1]
          }`;
      }
      extraLinks.push(obj);
    });
  }

  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="font-medium text-2xl capitalize select-none">
        {pageHeaderData.header}
      </h1>
      <Breadcrumb>
        <BreadcrumbList className="!gap-1">
          {pageHeaderData.links
            ? [...pageHeaderData.links, ...extraLinks].map((link, index) => {
                return (
                  <React.Fragment key={link.value}>
                    <BreadcrumbItem>
                      {!link.path ? (
                        <span
                          className={`text-base  ${
                            link.current ? "text-primary" : ""
                          }`}
                        >
                          {cleanWords(
                            typeof link.value === "function"
                              ? link.value(routeParams.id)
                              : link.value
                          )}
                        </span>
                      ) : (
                        <BreadcrumbLink asChild>
                          <CLink
                            className={`text-base  ${
                              link.current
                                ? "text-primary hover:!text-primary"
                                : "hover:!text-primary hover:underline"
                            }`}
                            to={{
                              pathname: `/${locale}${link.path(
                                routeParams.id
                              )}`,
                              search: link.search && link.search(),
                            }}
                          >
                            {cleanWords(
                              typeof link.value === "function"
                                ? link.value(routeParams.id)
                                : link.value
                            )}
                          </CLink>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index !==
                      [...pageHeaderData.links, ...extraLinks].length - 1 && (
                      <BreadcrumbSeparator>
                        <HiSlash className="!w-6 !h-6" />
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                );
              })
            : ""}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageHeader;
