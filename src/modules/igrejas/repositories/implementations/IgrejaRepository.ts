import { DocumentData, FieldValue } from 'firebase-admin/firestore';
import { IIgrejaRepository, ICreateIgrejaDTO, IUpdateIgrejaDTO} from '../IIgrejaRepository'
import {db} from '../../../../services/firestore'

class IgrejaRepository implements IIgrejaRepository {

    private igrejas: DocumentData[];

    private static INSTANCE: IgrejaRepository;

    private constructor() {
        this.igrejas = [];
    }

    public static getInstance(): IgrejaRepository {
        if(!IgrejaRepository.INSTANCE) {
            IgrejaRepository.INSTANCE = new IgrejaRepository()
        }

        return IgrejaRepository.INSTANCE
    }

    async findByRI(ri: string): Promise<DocumentData> {
        const igrejaRef = await db.collection('Igrejas').doc(ri)

        const igreja = (await igrejaRef.get()).data()
        const observacao =  (await igrejaRef.collection('Observacao').doc(ri).get()).data()
        const contato =  (await igrejaRef.collection('Contato').doc(ri).get()).data()
        const endereco = (await igrejaRef.collection('Endereço').doc(ri).get()).data()
        const log =  (await igrejaRef.collection('Logs').doc(ri).get()).data()
        const superintendencia =  (await igrejaRef.collection('Superintendencia').doc(ri).get()).data()
        const contribuicoes =  (await igrejaRef.collection('Contribuicoes').doc(ri).get()).data()


        const data = {
            ...igreja, 
            observacao: observacao.data,
            contato: contato.data,
            endereco: endereco.data,
            log,
            superintendencia,
            contribuicoes
        }
    
        return data
    }

    async list(): Promise<DocumentData[]> {
        const collectionRef = await db.collection('Igrejas')
        
        const data = await collectionRef.get()
        
        if(data.empty){
            return null
        }

      await data.forEach(async doc => {

        const ri = doc.id

        const igrejaRef = await collectionRef.doc(ri)

        const igreja = (await igrejaRef.get()).data()
        const observacao = (await igrejaRef.collection('Observacao').doc(ri).get()).data()
        const contato = (await igrejaRef.collection('Contato').doc(ri).get()).data()
        const endereco = (await igrejaRef.collection('Endereço').doc(ri).get()).data()
        const log = (await igrejaRef.collection('Logs').doc(ri).get()).data()
        const superitendencia =  (await igrejaRef.collection('Superintendencia').doc(ri).get()).data()
        const contribuicoes =  (await igrejaRef.collection('Contribuicoes').doc(ri).get()).data()


        const data = {
            ...igreja, 
            observacao: observacao.data,
            contato: contato.data,
            endereco: endereco.data,
            superitendencia,
            contribuicoes,
            log
        }

          
          this.igrejas.push(data)
        })
   
        return this.igrejas

    }   

    async create(data: ICreateIgrejaDTO): Promise<void> {
        const batch = db.batch()
        const { ri, nome, cnpj, tipo, igreja_sede, endereco, contato, dirigente, presidente, templo, membros, superitendencia, contribuicoes, observacao } = data
        

        const igrejaRef = await db.collection('Igrejas').doc(ri)
        const observacaoRef = await igrejaRef.collection('Observacao').doc(ri)
        const contatoRef = await igrejaRef.collection('Contato').doc(ri)
        const enderecoRef = await igrejaRef.collection('Endereço').doc(ri)
        const logRef = await igrejaRef.collection('Logs').doc(ri)
        const igrejaSedeRef = await igrejaRef.collection('Sede').doc(ri)
        const superitendenciaRef = await igrejaRef.collection('Superintendencia').doc(ri)
        const contribuicoesRef = await igrejaRef.collection('Contribuicoes').doc(ri)
        
                if(!!observacao){
                    batch.set(observacaoRef, {
                        data: observacao
                    })
                }
            
                batch.set(igrejaRef, {
                    ri, nome, cnpj, tipo, dirigente, presidente, templo, membros, igreja_sede
                })
        
                batch.set(enderecoRef, {
                    data: endereco
                })
        
                batch.set(contatoRef, {
                    data: contato
                })

                batch.set(superitendenciaRef, {
                    ...superitendencia
                })

                batch.set(contribuicoesRef, {
                    ...contribuicoes
                })

                batch.set(logRef,  
                    {
                        operations: FieldValue.arrayUnion({
                            created_at: new Date(),
                            created_by: 'admin',
                            descricao: 'Criação de registro'
                        })
                    }
                )

                await batch.commit()
        
    }

    async update(data: IUpdateIgrejaDTO): Promise<void> {

        const batch = db.batch()
        const { ri, nome, cnpj, tipo, igreja_sede, endereco, contato, dirigente, presidente, templo, membros, superitendencia, contribuicoes, observacao } = data
        

        const igrejaRef = await db.collection('Igrejas').doc(ri)
        const observacaoRef = await igrejaRef.collection('Observacao').doc(ri)
        const contatoRef = await igrejaRef.collection('Contato').doc(ri)
        const enderecoRef = await igrejaRef.collection('Endereço').doc(ri)
        const logRef = await igrejaRef.collection('Logs').doc(ri)
        const igrejaSedeRef = await igrejaRef.collection('Sede').doc(ri)
        const superitendenciaRef = await igrejaRef.collection('Superintendencia').doc(ri)
        const contribuicoesRef = await igrejaRef.collection('Contribuicoes').doc(ri)

        
        
                if(!!observacao){
                    batch.set(observacaoRef, {
                        data: observacao
                    })
                }
            
                batch.set(igrejaRef, {
                    ri, nome, cnpj, tipo, dirigente, presidente, templo, membros
                })
        
                batch.set(enderecoRef, {
                    data: endereco
                })
        
                batch.set(contatoRef, {
                    data: contato
                })

                batch.set(superitendenciaRef, {
                    ...superitendencia
                })

                batch.set(contribuicoesRef, {
                    ...contribuicoes
                })

                batch.set(logRef,  
                    {
                        operations: FieldValue.arrayUnion({
                            updated_at: new Date(),
                            updated_by: 'admin',
                            descricao: 'Atualização de registro'
                        })
                    }
                )

                await batch.commit()
        

    
    }

   async  delete(ri: string): Promise<void> {

            const batch = db.batch()

            const igrejaRef = await db.collection('Igrejas').doc(ri)
            const observacaoRef = await igrejaRef.collection('Observacao').doc(ri)
            const contatoRef = await igrejaRef.collection('Contato').doc(ri)
            const enderecoRef = await igrejaRef.collection('Endereço').doc(ri)
            const logRef = await igrejaRef.collection('Logs').doc(ri)
            const igrejaSedeRef = await igrejaRef.collection('Sede').doc(ri)
            const superitendenciaRef = await igrejaRef.collection('Superintendencia').doc(ri)
            const contribuicoesRef = await igrejaRef.collection('Contribuicoes').doc(ri)

    
             if((await observacaoRef.get()).data()){
                    batch.delete(observacaoRef)
                }
        
            batch.delete(igrejaRef)
    
            batch.delete(enderecoRef)
    
            batch.delete(contatoRef)

            batch.delete(igrejaSedeRef)

            batch.delete(superitendenciaRef)
            
            batch.delete(contribuicoesRef)

            batch.delete(logRef)


            await batch.commit()
    

    }
}


export {IgrejaRepository}