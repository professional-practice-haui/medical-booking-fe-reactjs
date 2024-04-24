import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import Breadcrumb from '../layouts/admin/Breadcrumb';
import PieChart from '../components/ChartOrder/PieChart';
import BarChart from '../components/ChartOrder/BarChart';

Chart.register(CategoryScale);

const handleConvertChart = (data) => {
  const pendingList = data.filter((item) => item.status === 'pending');
  const acceptedList = data.filter((item) => item.status === 'accepted');
  const rejectedList = data.filter((item) => item.status === 'rejected');

  return {
    labels: ['Đơn chưa xét', 'Đơn đủ điều kiện', 'Đơn chưa đủ điều kiện'],
    datasets: [
      {
        label: 'Users Gained ',
        data: [pendingList.length, acceptedList.length, rejectedList.length],
        backgroundColor: ['rgba(75,192,192,1)', '#50AF95', '#f3ba2f'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  };
};

const ChartOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         import.meta.env.VITE_API_URL + '/health-forms?limit=1000',
  //         {
  //           headers: {
  //             Authorization:
  //               'Bearer ' + JSON.parse(localStorage.getItem('token')),
  //           },
  //         },
  //       );
  //       const result = await response.json();
  //       setChartData(handleConvertChart(result.data.results));
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <Breadcrumb pageName="Thống kê đơn khám bệnh" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          {isLoading ? (
            <div className="relative rounded-xl overflow-auto">
              <div className="flex items-center justify-center">
                <button className="inline-flex items-center px-4 py-4 font-semibold leading-6 text-sm transition ease-in-out duration-150 cursor-not-allowed">
                  Processing...
                </button>
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className="w-1/2 px-8">
                <PieChart chartData={chartData} />
              </div>
              <div className="w-1/2 px-8">
                <BarChart chartData={chartData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChartOrder;
