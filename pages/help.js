import Accordion from '../components/common/accordion';
import Layout from '../components/layout/layout';

const Help = () => {
  return (
    <Layout>
      <div className="text-center py-5">
        <h3>자주 묻는 질문 모음</h3>
      </div>
      <div className="p-5 pt-0">
        <Accordion />
      </div>
    </Layout>
  );
};

export default Help;
