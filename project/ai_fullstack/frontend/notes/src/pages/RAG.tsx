import Header from '@/components/Header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRagStore } from '@/store/rag';


const RAG: React.FC = () => {
  const { question, setQuestion, answer, retrieve } = useRagStore();

  const ask = async () => {
    if (!question.trim()) {
      return;
    }
    await retrieve();
  }

  // Fragment 组件
  return (
    <div>
      <Header title="RAG" showBackBtn={true} />
        <div className="max-w-xl mx-auto mx-auto mx-10 space-y-4 p-4">
          <Textarea placeholder="请输入你的问题，例如：什么是RAG？"
            value={question} onChange={e => setQuestion(e.target.value)}
          />
          <Button onClick={ask}>提问</Button>
          {
            answer && (
              <Card>
                <CardContent className="p-4 whitespace-pre-wrap">
                  <p>{answer}</p>
                </CardContent>
              </Card>
            )
          }
        </div>
    </div>
  )
}

export default RAG;