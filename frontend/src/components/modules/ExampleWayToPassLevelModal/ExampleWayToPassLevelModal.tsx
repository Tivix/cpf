import { Modal } from '@app/components/common/Modal';
import { Markdown } from '@app/components/common/Markdown';
import { ExampleWayToPassLevelModalProps } from './ExampleWayToPassLevelModal.interface';

export const ExampleWayToPassLevelModal: React.FC<ExampleWayToPassLevelModalProps> = ({ open, onClose, projects }) => {
  return (
    <Modal open={open} onClose={onClose} title="An example way to pass level">
      {projects.map(({ title, overview }) => (
        <div key={title} className="overflow-hidden text-base text-navy-600">
          <p>{title}</p>
          <article className="prose mt-5">
            <Markdown text={overview} />
          </article>
        </div>
      ))}
    </Modal>
  );
};
