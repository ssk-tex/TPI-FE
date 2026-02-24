import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSchemeDetailsStore } from "../../store/schemeStore";
import { nrlmAckStore } from "../../store/nrlmStore";
import { date_time, getColumnSchemewise } from "../../helper/helper";
import TruncateText from "../../helper/TruncateText";
import Btn from "../../components/Btn";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import SchemePageLayout from "../../components/SchemePageLayout";
import Table from "../../components/Table";
import { fetchNrlmFtoList } from "../../services/nrlmService";
import { fetchFTOList } from "../../services/schemeService";

export default function NrlmFtoListPage() {
  const navigate = useNavigate();
  const { schemeName } = useSchemeDetailsStore();

  const [ftoList, setFtoList] = useState([]);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [autoMode, setAutoMode] = useState(false);

  const columns = getColumnSchemewise(schemeName);

  /*-------------------------------------
    🟦 Common Mapping Function 
  -------------------------------------*/
  const mapTableRows = (data) => {
    return data.map((item, i) => ({
      id: item.fto_id
        ? <TruncateText text={item.fto_id} length={5} />
        : i + 1,
      ftoNo: item.fto_no || "-",
      enc_data: item.fto_encrypted_data
        ? <TruncateText text={item.fto_encrypted_data} length={30} />
        : "-",
      time: item.fto_received_at ? date_time(item.fto_received_at) : "-",
      status: item.nrlm_trans_status || "-",
      isAction: (
        <Btn
          label="Decrypt"
          variant="primary"
          size="sm"
          onClick={() =>
            navigate("/decrypted-fto-list", {
              state: {
                encryptedData: item.fto_encrypted_data,
                ftoTxnLogId: item.fto_trans_log_id,
                ftoId: item.fto_id,
              },
            })
          }
        />
      ),
    }));
  };

  /*-------------------------------------
    🟦 Default Lazy Load API Call
  -------------------------------------*/
  const loadDefaultFTO = async () => {
    try {
      setLoading(true);

      const res = await fetchFTOList({
        SchemeName: schemeName,
        page,
        size: 5,
      });

      if (!res.data || res.data.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setFtoList(prev => [...prev, ...mapTableRows(res.data)]);
      setPage(prev => prev + 1);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /*-------------------------------------
    🟦 Auto Mode → New FTO Lazy Load 
  -------------------------------------*/
  const loadNewFTO = async () => {
    try {
      setLoading(true);

      const res = await fetchNrlmFtoList({
        page,
        size: 5,
      });

      if (!res.data || res.data.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setFtoList(prev => [...prev, ...mapTableRows(res.data)]);
      setPage(prev => prev + 1);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /*-------------------------------------
    🟦 Master Lazy Loading UseEffect
  -------------------------------------*/
  useEffect(() => {
    if (!hasMore) return;

    if (autoMode) {
      loadNewFTO();
    } else {
      loadDefaultFTO();
    }
  }, [page]);


  /*-------------------------------------
    🟦 Button → Auto Mode ON 
    পুরনো ডাটা clear + নতুন লোড শুরু
  -------------------------------------*/
  const handleNewFTOFetch = () => {
    setAutoMode(true); 
    setFtoList([]);
    setHasMore(true);
    setPage(0);
  };


  if (loading && page === 0) return <Loader />;

  return (
    <SchemePageLayout>
      <main className="flex-1 min-h-screen bg-gradient-to-br from-indigo-100 to-white p-8">

        <div className="bg-gradient-to-br from-indigo-100 to-white p-8">
          <Table
            tableName="FTO List"
            columns={columns}
            data={ftoList}
            rowsPerPage={5}
          />
        </div>

        <div className="flex justify-center mt-4">
          <Btn
            label={loading ? "Fetching..." : "Fetch New FTO"}
            variant="success"
            size="xxl"
            disabled={loading}
            onClick={handleNewFTOFetch}
          />
        </div>
      </main>
    </SchemePageLayout>
  );
}
