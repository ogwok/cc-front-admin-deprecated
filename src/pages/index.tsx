import { Badge, Dropdown, Table, useTheme } from "flowbite-react";
import type { FC } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import svgMap from "svgmap";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";

const DashboardPage: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="px-4 pt-6">
        <AverageRatingThisWeek />
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <TopRatedCoaches />
          <SessionsThisWeek />
          <StudentEngagementThisWeek />
        </div>
        <div className="my-4 grid grid-cols-1 xl:gap-4 2xl:grid-cols-3">
          <SessionsBySubject />
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-1">
            <RecentFeedback />
            <RatingDistribution />
          </div>
        </div>
        <RecentSessions />
      </div>
    </NavbarSidebarLayout>
  );
};

const AverageRatingThisWeek: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="shrink-0">
          <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
            4.7
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
            Average rating this week
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
          0.3
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <RatingChart />
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <Datepicker />
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Ratings Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const RatingChart: FC = function() {
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";

  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      opacity: 1,
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      min: 0,
      max: 5,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName: string) {
            return "Average Rating:";
          },
        },
      },
      marker: {
        show: false,
      },
    },
    colors: ["#1A56DB"],
  };
  const series = [
    {
      name: "Average Rating",
      data: [4.2, 4.3, 4.5, 4.6, 4.4, 4.7, 4.7],
    },
  ];

  return <Chart height={300} options={options} series={series} type="area" />;
};

const TopRatedCoaches: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Top Rated Coaches
        </h3>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {[
            { name: "John Doe", rating: 4.9, subject: "Mathematics" },
            { name: "Jane Smith", rating: 4.8, subject: "Physics" },
            { name: "Bob Johnson", rating: 4.7, subject: "Chemistry" },
          ].map((coach, index) => (
            <li key={index} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {coach.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {coach.subject}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {coach.rating}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SessionsThisWeek: FC = function () {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yaxis: {
      title: {
        text: 'Sessions'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + " sessions"
        }
      }
    }
  };

  const series = [{
    name: 'Sessions',
    data: [44, 55, 57, 56, 61, 58, 63]
  }];

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4">
        Sessions This Week
      </h3>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

const StudentEngagementThisWeek: FC = function () {
  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: 7,
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    title: {
      text: 'Student Engagement',
      align: 'left',
      style: {
        fontSize: "16px",
        color: '#666'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [ '#1A56DB' ],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    },
    markers: {
      size: 4,
      colors: ["#FFA41B"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Engagement %',
      },
    }
  };

  const series = [{
    name: 'Engagement',
    data: [70, 75, 80, 78, 85, 82, 88]
  }];

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

const SessionsBySubject: FC = function () {
  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const series = [44, 55, 13, 43, 22];

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4">
        Sessions by Subject
      </h3>
      <Chart options={options} series={series} type="pie" width={380} />
    </div>
  );
};

const RecentFeedback: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4">
        Recent Feedback
      </h3>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {[
            { student: "Alice", coach: "John Doe", rating: 5, comment: "Excellent session!" },
            { student: "Bob", coach: "Jane Smith", rating: 4, comment: "Very helpful." },
            { student: "Charlie", coach: "Bob Johnson", rating: 5, comment: "Clear explanations." },
          ].map((feedback, index) => (
            <li key={index} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {feedback.student} - {feedback.coach}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {feedback.comment}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {feedback.rating}/5
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const RatingDistribution: FC = function () {
  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val: number) {
          return val + "%";
        }
      }
    },
    title: {
      text: 'Rating Distribution',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  const series = [{
    name: 'Percentage',
    data: [2.5, 5.5, 20.0, 32.0, 40.0]
  }];

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
    );
  };

const RecentSessions: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Recent Sessions
        </h3>
        <a
        href="#"
        className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
        View all
      </a>
    </div><div className="mt-4 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Student</Table.HeadCell>
                  <Table.HeadCell>Coach</Table.HeadCell>
                  <Table.HeadCell>Subject</Table.HeadCell>
                  <Table.HeadCell>Rating</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {[
                    { date: "2024-08-25", student: "Alice", coach: "John Doe", subject: "Mathematics", rating: 5 },
                    { date: "2024-08-24", student: "Bob", coach: "Jane Smith", subject: "Physics", rating: 4 },
                    { date: "2024-08-23", student: "Charlie", coach: "Bob Johnson", subject: "Chemistry", rating: 5 },
                    { date: "2024-08-22", student: "David", coach: "Sarah Williams", subject: "Biology", rating: 4 },
                    { date: "2024-08-21", student: "Eve", coach: "Michael Brown", subject: "Literature", rating: 5 },
                  ].map((session, index) => (
                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {session.date}
                      </Table.Cell>
                      <Table.Cell>{session.student}</Table.Cell>
                      <Table.Cell>{session.coach}</Table.Cell>
                      <Table.Cell>{session.subject}</Table.Cell>
                      <Table.Cell>
                        <Badge color={session.rating >= 4 ? "success" : "warning"}>
                          {session.rating}/5
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Datepicker: FC = function () {
  return (
    <span className="text-sm text-gray-600">
      <Dropdown
        label="Last 7 days"
        inline
        dismissOnClick={false}
      >
        <Dropdown.Item>Last 7 days</Dropdown.Item>
        <Dropdown.Item>Last 30 days</Dropdown.Item>
        <Dropdown.Item>Last 90 days</Dropdown.Item>
      </Dropdown>
    </span>
  );
};

export default DashboardPage;