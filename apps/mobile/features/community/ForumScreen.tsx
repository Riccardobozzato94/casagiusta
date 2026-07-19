import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  RefreshControl,
  Modal,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { timeAgo, generateAnonymousName } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

interface ForumPost {
  id: string;
  anonymous_name: string;
  city: string | null;
  category: string;
  content: string;
  upvote_count: number;
  comment_count: number;
  created_at: string;
}

interface ForumComment {
  id: string;
  anonymous_name: string;
  content: string;
  created_at: string;
}

const CATEGORIES = [
  'Tutti',
  'Affitto',
  'Sfratto',
  'Manutenzione',
  'Deposito',
  'Discriminazione',
  'Consigli',
  'Altro',
] as const;

const CITIES = [
  'Tutte',
  'Milano',
  'Roma',
  'Napoli',
  'Torino',
  'Bologna',
  'Firenze',
  'Palermo',
  'Genova',
  'Venezia',
] as const;

export function ForumScreen() {
  const insets = useSafeAreaInsets();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ForumPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutti');
  const [selectedCity, setSelectedCity] = useState<string>('Tutte');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Consigli');

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [posts, selectedCategory, selectedCity]);

  const loadPosts = async () => {
    const { data } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (data) {
      setPosts(data as ForumPost[]);
    }
  };

  const applyFilters = useCallback(() => {
    let result = [...posts];
    if (selectedCategory !== 'Tutti') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedCity !== 'Tutte') {
      result = result.filter(p => p.city === selectedCity);
    }
    setFilteredPosts(result);
  }, [posts, selectedCategory, selectedCity]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const loadComments = async (postId: string) => {
    const { data } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (data) {
      setComments(data as ForumComment[]);
    }
  };

  const openPost = async (post: ForumPost) => {
    setSelectedPost(post);
    await loadComments(post.id);
  };

  const handleReport = (postId: string) => {
    Alert.alert(
      'Segnala post',
      'Grazie per averci aiutato a mantenere la community al sicuro. Il nostro team modererà il contenuto.',
      [{ text: 'OK' }],
    );
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      anonymous_name: generateAnonymousName(),
      category: newPostCategory,
      content: newPostContent.trim(),
      upvote_count: 0,
      comment_count: 0,
    };

    const { error } = await supabase.from('community_posts').insert(newPost);
    if (!error) {
      setShowNewPost(false);
      setNewPostContent('');
      await loadPosts();
    }
  };

  const renderPost = ({ item }: { item: ForumPost }) => (
    <TouchableOpacity
      onPress={() => openPost(item)}
      className="bg-surface-primary dark:bg-surface-dark-secondary rounded-2xl p-4 mb-3 mx-4 active:opacity-80"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center mb-2">
        <View className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full items-center justify-center mr-3">
          <Text className="text-primary-700 dark:text-primary-300 font-bold">
            {item.anonymous_name.charAt(0)}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-text-primary dark:text-white">
            {item.anonymous_name}
          </Text>
          {item.city && (
            <Text className="text-xs text-text-tertiary dark:text-text-dark-tertiary">
              {item.city}
            </Text>
          )}
        </View>
        <Badge label={item.category} variant="info" size="sm" />
      </View>

      <Text className="text-text-primary dark:text-white text-base mb-3 leading-5">
        {item.content}
      </Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-4">
          <View className="flex-row items-center">
            <Text className="mr-1 text-text-secondary dark:text-text-dark-secondary">{'\u2B06'}</Text>
            <Text className="text-sm text-text-secondary dark:text-text-dark-secondary">
              {item.upvote_count}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="mr-1 text-text-secondary dark:text-text-dark-secondary">{'\u{1F4AC}'}</Text>
            <Text className="text-sm text-text-secondary dark:text-text-dark-secondary">
              {item.comment_count}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <Text className="text-xs text-text-tertiary dark:text-text-dark-tertiary mr-3">
            {timeAgo(item.created_at)}
          </Text>
          <TouchableOpacity onPress={() => handleReport(item.id)} hitSlop={8}>
            <Text className="text-text-tertiary dark:text-text-dark-tertiary text-xs">{'\u{1F6AB}'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-surface-secondary dark:bg-surface-dark-primary">
      {/* Filters */}
      <View className="px-4 pt-3 pb-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedCategory === cat
                  ? 'bg-primary-600'
                  : 'bg-surface-primary dark:bg-surface-dark-secondary'
              }`}
              activeOpacity={0.7}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedCategory === cat ? 'text-white' : 'text-text-primary dark:text-white'
                }`}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CITIES.map(city => (
            <TouchableOpacity
              key={city}
              onPress={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-full mr-2 ${
                selectedCity === city
                  ? 'bg-accent-500'
                  : 'bg-surface-primary dark:bg-surface-dark-secondary'
              }`}
              activeOpacity={0.7}
            >
              <Text
                className={`text-xs font-medium ${
                  selectedCity === city ? 'text-white' : 'text-text-secondary dark:text-text-dark-secondary'
                }`}
              >
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Posts list */}
      {filteredPosts.length > 0 ? (
        <FlatList
          data={filteredPosts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0d9488" />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          icon={'\u{1F4AC}'}
          title="Ancora nessun post"
          description="Sii il primo a condividere la tua esperienza. La community è anonima e sicura."
          actionLabel="Scrivi un post"
          onAction={() => setShowNewPost(true)}
          variant="encouraging"
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        onPress={() => setShowNewPost(true)}
        className="absolute bottom-8 right-5 w-14 h-14 bg-primary-600 rounded-full items-center justify-center shadow-lg z-50 active:bg-primary-700"
        activeOpacity={0.8}
      >
        <Text className="text-white text-2xl">+</Text>
      </TouchableOpacity>

      {/* Post detail modal */}
      <Modal visible={!!selectedPost} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 bg-surface-primary dark:bg-surface-dark-primary" style={{ paddingTop: insets.top + 8 }}>
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark">
            <TouchableOpacity onPress={() => setSelectedPost(null)} hitSlop={8}>
              <Text className="text-primary-600 font-semibold">Indietro</Text>
            </TouchableOpacity>
            <Text className="font-display font-bold text-text-primary dark:text-white">Dettaglio</Text>
            <TouchableOpacity onPress={() => selectedPost && handleReport(selectedPost.id)} hitSlop={8}>
              <Text className="text-text-tertiary">{'\u{1F6AB}'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-4 pt-4">
            {selectedPost && (
              <>
                <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full items-center justify-center mr-3">
                    <Text className="text-primary-700 dark:text-primary-300 font-bold">
                      {selectedPost.anonymous_name.charAt(0)}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-text-primary dark:text-white">
                      {selectedPost.anonymous_name}
                    </Text>
                    <Text className="text-xs text-text-tertiary dark:text-text-dark-tertiary">
                      {selectedPost.city ? `${selectedPost.city} \u00B7 ` : ''}{timeAgo(selectedPost.created_at)}
                    </Text>
                  </View>
                  <Badge label={selectedPost.category} variant="info" />
                </View>

                <Text className="text-text-primary dark:text-white text-base leading-6 mb-4">
                  {selectedPost.content}
                </Text>

                <View className="flex-row items-center mb-6">
                  <TouchableOpacity className="flex-row items-center mr-6" activeOpacity={0.7}>
                    <Text className="text-lg mr-1">{'\u2B06'}</Text>
                    <Text className="text-text-secondary dark:text-text-dark-secondary">
                      {selectedPost.upvote_count}
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-text-tertiary">
                    {selectedPost.comment_count} commenti
                  </Text>
                </View>

                {/* Comments */}
                <Text className="font-display font-bold text-text-primary dark:text-white text-lg mb-3">
                  Commenti
                </Text>

                {comments.length > 0 ? (
                  comments.map(comment => (
                    <View
                      key={comment.id}
                      className="bg-surface-secondary dark:bg-surface-dark-secondary rounded-xl p-4 mb-3"
                    >
                      <View className="flex-row items-center mb-2">
                        <Text className="font-semibold text-text-primary dark:text-white text-sm">
                          {comment.anonymous_name}
                        </Text>
                        <Text className="text-xs text-text-tertiary dark:text-text-dark-tertiary ml-auto">
                          {timeAgo(comment.created_at)}
                        </Text>
                      </View>
                      <Text className="text-text-primary dark:text-white text-sm leading-5">
                        {comment.content}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-text-tertiary dark:text-text-dark-tertiary text-center py-6">
                    Ancora nessun commento. Sii il primo a rispondere.
                  </Text>
                )}
              </>
            )}
          </ScrollView>

          {/* Add comment */}
          <View className="px-4 py-3 border-t border-border-light dark:border-border-dark flex-row items-center">
            <TextInput
              placeholder="Scrivi un commento anonimo..."
              placeholderTextColor="#64748b"
              className="flex-1 bg-surface-secondary dark:bg-surface-dark-secondary rounded-xl px-4 py-3 text-text-primary dark:text-white mr-3"
            />
            <TouchableOpacity className="bg-primary-600 w-10 h-10 rounded-full items-center justify-center active:bg-primary-700">
              <Text className="text-white">{'\u27A1'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* New post modal */}
      <Modal visible={showNewPost} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 bg-surface-primary dark:bg-surface-dark-primary" style={{ paddingTop: insets.top + 8 }}>
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark">
            <TouchableOpacity onPress={() => setShowNewPost(false)} hitSlop={8}>
              <Text className="text-primary-600 font-semibold">Annulla</Text>
            </TouchableOpacity>
            <Text className="font-display font-bold text-text-primary dark:text-white">Nuovo post</Text>
            <View style={{ width: 60 }} />
          </View>

          <ScrollView className="flex-1 px-4 pt-4">
            <Text className="text-text-secondary dark:text-text-dark-secondary text-sm mb-2">
              Categoria
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              {CATEGORIES.filter(c => c !== 'Tutti').map(cat => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setNewPostCategory(cat)}
                  className={`px-4 py-2 rounded-full mr-2 ${
                    newPostCategory === cat
                      ? 'bg-primary-600'
                      : 'bg-surface-secondary dark:bg-surface-dark-secondary'
                  }`}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`text-sm font-medium ${
                      newPostCategory === cat ? 'text-white' : 'text-text-primary dark:text-white'
                    }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text className="text-text-secondary dark:text-text-dark-secondary text-sm mb-2">
              Il tuo post (anonimo)
            </Text>
            <TextInput
              value={newPostContent}
              onChangeText={setNewPostContent}
              placeholder="Condividi la tua esperienza... Ricorda: niente dati personali, la community è pubblica."
              placeholderTextColor="#64748b"
              multiline
              className="bg-surface-secondary dark:bg-surface-dark-secondary rounded-2xl p-4 text-text-primary dark:text-white min-h-[200px] leading-5"
              textAlignVertical="top"
            />

            <Text className="text-xs text-text-tertiary dark:text-text-dark-tertiary mt-3">
              Il tuo nome sarà generato automaticamente per proteggere la tua privacy.
            </Text>
          </ScrollView>

          <View className="px-4 py-3 border-t border-border-light dark:border-border-dark">
            <TouchableOpacity
              onPress={handleCreatePost}
              disabled={!newPostContent.trim()}
              className={`py-4 rounded-xl items-center ${
                newPostContent.trim() ? 'bg-primary-600 active:bg-primary-700' : 'bg-surface-tertiary dark:bg-surface-dark-tertiary'
              }`}
              activeOpacity={0.8}
            >
              <Text className={`font-bold text-lg ${
                newPostContent.trim() ? 'text-white' : 'text-text-tertiary dark:text-text-dark-tertiary'
              }`}>
                Pubblica in anonimo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
